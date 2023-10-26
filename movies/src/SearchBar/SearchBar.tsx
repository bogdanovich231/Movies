import { ChangeEvent, Component } from "react";
import search from "../assets/Vector.svg";
import './SearchBar.scss';
import IMovie, { searchMovie } from "../Api/Api";

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
    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    }
    handleSearch = async () => {
        const { query } = this.state;
        const result = await searchMovie(query);
        console.log("Results from API:", result);
        this.props.updateSearchResults(result || []);
    }
    render() {
        return (
            <div className="search_bar" >
                <input placeholder="Search movie" type="text" onChange={this.handleInputChange} />
                <button className="search_btn" onClick={this.handleSearch}>
                    <img src={search} alt="search btn" />
                </button>
            </div>
        )
    }
}

export default Search;