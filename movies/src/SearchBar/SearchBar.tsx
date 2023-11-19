import { ChangeEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import search from '../assets/Vector.svg';
import './SearchBar.scss';
import { useGetMoviesQuery } from '../Api/Api';
import { RootState } from '../store/store';
import { setSearchResults , setLoading, setQuery} from '../store/search/search.slice';

const Search: FC = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.rootReducer.search);

  const { data: searchResults, error } = useGetMoviesQuery({
    query,
    page: 1, 
  });

  useEffect(() => {
    if (searchResults) {
      dispatch(setSearchResults(searchResults.data.movies));
      dispatch(setLoading(false));
    }
    if (error) {
      console.log('Error:', error);
      dispatch(setLoading(false));
    }
  }, [dispatch, searchResults, error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleSearch = () => {
    dispatch(setLoading(true));
  };

  return (
    <div className="search_bar">
      <input placeholder="Search movie" type="text" onChange={handleInputChange} value={query} />
      <button className="search_btn" onClick={handleSearch}>
        <img src={search} alt="search btn" />
      </button>
    </div>
  );
};

export default Search;
