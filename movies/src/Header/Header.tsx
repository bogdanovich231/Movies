import { onAuthStateChanged } from 'firebase/auth';
import ShowError from '../ErrorBoundary/ShowError';
import { auth } from '../Helper/auth';
import Search from '../SearchBar/SearchBar';
import './Header.scss';
import { Outlet, Link } from 'react-router-dom';
import LogOut from '../LogOut/LogOut';
import { useEffect, useState } from 'react';

function Header() {
  const [isLoggedIn, setLoggedIn] = useState(!!auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="header">
      <h1>
        <Link to={`/`}>Movies</Link>
      </h1>
      <Search />
      <Link to={'favorite'}>favorite</Link>
      {isLoggedIn ? (
        <LogOut />
      ) : (
        <div className="btn_container">
          <Link to={`/autorization`}>Sign in</Link>
          <Link to={`/register`}>Sign Up</Link>
        </div>
      )}
      <ShowError />

      <Outlet />
    </div>
  );
}

export default Header;
