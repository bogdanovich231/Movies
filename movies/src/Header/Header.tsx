import { onAuthStateChanged } from 'firebase/auth';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { auth } from '../Helper/auth';
import Search from '../SearchBar/SearchBar';
import './Header.scss';
import { Outlet, Link } from 'react-router-dom';
import LogOut from '../LogOut/LogOut';
import { useEffect, useState } from 'react';
import favoriteButton from '../assets/heart.svg';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(!!auth.currentUser);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      enableBodyScroll(document.body);
    } else {
      disableBodyScroll(document.body);
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="header">
      <h1>
        <Link className="logo" to={`/`}>
          Movies
        </Link>
      </h1>
      <Search />
      <nav>
        <div className={`header_burger-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
        </div>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          {isLoggedIn ? (
            <div className="btn_container">
              <li>
                <LogOut />
              </li>
              <li>
                <Link className="favorite_button" to={'favorite'}>
                  <img src={favoriteButton} alt="" />
                </Link>
              </li>
            </div>
          ) : (
            <div className="btn_container">
              <li>
                <Link className="auth_button" to={`/autorization`}>
                  Sign in
                </Link>
              </li>
              <li>
                <Link className="auth_button" to={`/register`}>
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}

export default Header;
