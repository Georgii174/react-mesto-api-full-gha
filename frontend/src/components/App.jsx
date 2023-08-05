import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import success from "../images/success.svg";
import fail from "../images/fail.svg";
import Register from './Register';
import ConfirmPopup from './ConfirmPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';
import { apiAuth } from '../utils/ApiAuth';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [removeCardId, setRemoveCardId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [profileEmail, setProfileEmail] = useState('');
  const [message, setMessage] = useState({ path: '', text: '' });

  useEffect(() => {
    async function checkAuth() {
      if (!localStorage.getItem('JWT')) return;
      try {
        const res = await apiAuth.checkToken(localStorage.getItem('JWT'));
        if (res.data) {
          setProfileEmail(res.data.email);
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.log(err);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoggedIn) return;
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) =>
        console.log(err));

    api
      .getInitialCards()
      .then((res) => {
        setCards([...res]);
      })
      .catch((err) =>
        console.log(err));
  }, [isLoggedIn])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleCardDeleteClick(cardId) {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemoveCardId(cardId);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipPopupOpen(false)
    setIsConfirmPopupOpen(false)
  }

  function handleCardLike(likes, _id) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(_id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === _id ? newCard : c));
      })
      .catch((err) =>
        console.log(err));
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then(() => setCards((state) => state.filter((item) => item._id !== id)),
        closeAllPopup())
      .catch((err) =>
        console.log(err));
  }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) =>
        console.log(err));
  }

  function handleAuthorize(email, password) {
    apiAuth
      .signin({ email, password })
      .then((res) =>
        localStorage.setItem('JWT', res.token)
      )
      .then(() =>
        setIsLoggedIn(true),
      )
      .catch(err => {
        console.log(err);
      })
  }

  function handleRegister(email, password) {
    apiAuth
      .signup({ email, password })
      .then((res) => {
        setProfileEmail(res.data.email)
        setMessage({ path: success, text: 'Вы успешно зарегистрировались!' })
      })
      .catch(err => {
        setMessage({ path: fail, text: 'Что-то пошло не так! Попробуйте ещё раз.' })
        console.log(err);
      })
      .finally(() => setIsInfoTooltipPopupOpen(true));

  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('JWT');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                userEmail={profileEmail}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                cards={cards}
                isLoggedIn={isLoggedIn}
                onSignOut={handleSignOut}
              />
            }
          />
          <Route path='sign-in' element={
            <Login onAuthorize={handleAuthorize} isLoggedIn={isLoggedIn} />
          }
          />
          <Route path='sign-up' element={
            <Register onRegister={handleRegister} isLoggedIn={isLoggedIn} />
          }
          />
          <Route path='*' element={
            isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
          }
          />
        </Routes>

        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopup}
          onSubmit={handleCardDelete}
          card={removeCardId}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopup}
          title={message.text}
          path={message.path}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

