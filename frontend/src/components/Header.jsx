import React, { useState } from 'react';
import logo from '../images/logo/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, onSignOut, isLoggedIn }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleToggle() {
    setIsMenuOpen(!isMenuOpen)
  }

  function handleSignOut() {
    setIsMenuOpen(false);
    onSignOut();
  }

  return (
    <header className="header">
      <div className={`header__info ${isMenuOpen ? 'header__info_opened' : ''}`}>
        <button className='header__sign-out' onClick={handleSignOut}>Выйти</button>
        <span className='header__email'>{userEmail}</span>
      </div>
      <div className='header__container'>
        <img src={logo} alt="место" className="header__logo" />
        {location.pathname === '/sign-in' && (
          <Link className='header__link' to='/sign-up'>Регистрация</Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link className='header__link' to='/sign-in'>Войти</Link>
        )}
        {location.pathname === '/' && (
          <>
            <button className={`header__menu ${isMenuOpen ? 'header__menu_opened' : ''}`} onClick={() => handleToggle()}></button>
            <nav className='header__nav'>
              <button className='header__sign-out' onClick={() => onSignOut()}>Выйти</button>
              <span className='header__email'>{userEmail}</span>
            </nav>
          </>
        )}
      </div>
    </header>
  )
}

export default Header





