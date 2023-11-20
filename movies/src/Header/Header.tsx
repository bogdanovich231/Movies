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
      <Search  />
      <ShowError />
      <Outlet />
    </div>
  );
}

export default Header;
