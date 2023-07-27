import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({onCardClick, name, link, likes, _id, owner, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`group__button-like ${isLiked && 'group__button-like_active'}`
);

  function handleCardClick() {
    onCardClick({name, link});
  }

  function handleLikeClick() {
    onCardLike(likes, _id)
  }

  function handleDeleteClick() {
    onCardDelete(_id)
  }

  return (
    <article className="group__element">
      <img className="group__images" src={link} alt={name} onClick={handleCardClick} />
      {isOwn && <button type="button" className="group__button-del" onClick={handleDeleteClick}></button>}
      <div className="group__title">
        <h2 className="group__name">{name}</h2>
        <div className="group__title_like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="group__like-check">{likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
