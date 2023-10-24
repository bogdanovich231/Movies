import Search from "../SearchBar/SearchBar"
import './Header.scss'
function Header() {
    return (
        <div className="header">
            <h1><a href="#">Movies</a></h1>
            <Search />
        </div>
    )
}

export default Header