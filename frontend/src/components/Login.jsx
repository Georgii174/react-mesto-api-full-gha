import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";
import Header from "./Header";

function Login({ onAuthorize, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAuthorize(email, password);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Header />
      <div className="register">
        <Auth formName='register' onSubmit={handleSubmit} title='Авторизация' buttonText='Войти'>
          <input type="email" className="popup__input popup__input_type_login"
            id="email-input" name="email"
            placeholder="Email" minLength="8" maxLength="40" required
            onChange={handleChangeEmail}
            value={email || ''} />
          <input type="password" className="popup__input popup__input_type_login"
            id="pass-input" name="pass"
            placeholder="Пароль" minLength="6" maxLength="200" required
            onChange={handleChangePassword}
            value={password || ''} />
        </Auth>
      </div>
    </>
  )
}

export default Login
