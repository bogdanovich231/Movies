import { Component } from "react";
import search from "../assets/Vector.svg";
import './SearchBar.scss';

interface SearchState {
    query: string;
    searchResults: IMovie | [] | undefined;
}
interface SearchProps {
    updateSearchResults: (results: IMovie[] | undefined) => void;
}
class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            query: '',
            searchResults: [],
        };
    }

    render() {
        return (
            <div className="search_bar" >
                <input placeholder="Search movie" type="text" />
                <button className="search_btn">
                    <img src={search} alt="search btn" />
                </button>
            </div>
        )
    }
}

export default Search;