import ShowError from '../ErrorBoundary/ShowError';
import Search from '../SearchBar/SearchBar';
import './Header.scss';
import { Outlet, Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <h1>
        <Link to={`/`}>Movies</Link>
      </h1>
      <Search />
      <div className="btn_container">
        <Link to={`/autorization`}>Sign in</Link>
        <Link to={`/register`}>Sign Up</Link>
        <ShowError />
      </div>

      <Outlet />
    </div>
  );
}

export default Header;
