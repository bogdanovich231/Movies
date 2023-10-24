import search from "../assets/Vector.svg";
import './SearchBar.scss';

function Search() {
    return (
        <div className="search_bar">
            <input placeholder="Search movie" type="text" />
            <button className="search_btn">
                <img src={search} alt="search btn" />
            </button>
        </div>
    )
}

export default Search;