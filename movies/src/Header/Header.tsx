import Search from "../SearchBar/SearchBar";
import './Header.scss';

function Header({ updateSearchResults }: any) {
    return (
        <div className="header">
            <h1><a href="#">Movies</a></h1>
            <Search updateSearchResults={updateSearchResults} />
        </div>
    )
}

export default Header;