import ShowError from '../ErrorBoundary/ShowError';
import Search, { SearchProps } from '../SearchBar/SearchBar';
import './Header.scss';

function Header({ updateSearchResults }: SearchProps) {
  return (
    <div className="header">
      <h1>
        <a href="#">Movies</a>
      </h1>
      <Search updateSearchResults={updateSearchResults} />
      <ShowError />
    </div>
  );
}

export default Header;
