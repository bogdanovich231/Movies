import { ChangeEvent, Component } from 'react';
import search from '../assets/Vector.svg';
import './SearchBar.scss';
import IMovie, { searchMovie } from '../Api/Api';
import Loading from '../Loading/Loading';

export interface SearchState {
    query: string;
    searchResults: IMovie | [] | undefined;
    isLoading: boolean;
}
export interface SearchProps {
    updateSearchResults: (results: IMovie[] | undefined) => void;
}
class Search extends Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            query: localStorage.getItem('searchQuery') || '',
            searchResults: [],
            isLoading: false,
        };
    }
    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    };
    handleSearch = async () => {
        const { query } = this.state;
        localStorage.setItem('searchQuery', query);
        this.setState({ isLoading: true });
        try {
            const result = (await searchMovie(query)) as IMovie[] | undefined;
            console.log('Results from API:', result);
            this.props.updateSearchResults(result || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <div className="search_bar">
                <input placeholder="Search movie" type="text" onChange={this.handleInputChange} value={this.state.query} />
                <button className="search_btn" onClick={this.handleSearch}>
                    <img src={search} alt="search btn" />
                </button>

            </div>
        );
    }
}

export default Search;
