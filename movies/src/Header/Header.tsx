import ShowError from '../ErrorBoundary/ShowError';
import Search from '../SearchBar/SearchBar';
import { SearchProps } from '../Types/Types';
import './Header.scss';
import { Outlet, Link } from 'react-router-dom';

function Header({ updateSearchResults }: SearchProps) {
  return (
    <div className="header">
      <h1>
        <Link to={`/`}>Movies</Link>
      </h1>
      <Search updateSearchResults={updateSearchResults} />
      <ShowError />
      <Outlet />
    </div>
  );
}

export default Header;
