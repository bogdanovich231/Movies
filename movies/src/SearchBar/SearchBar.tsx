import { ChangeEvent, useState } from 'react';
import search from '../assets/Vector.svg';
import './SearchBar.scss';
import IMovie, { searchMovie } from '../Api/Api';

export interface SearchProps {
  updateSearchResults: (results: IMovie[] | undefined) => void;
}

function Search({ updateSearchResults }: SearchProps) {
  const [query, setQuery] = useState<string>(localStorage.getItem('searchQuery') || '');
  const [, setIsLoading] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    localStorage.setItem('searchQuery', query);
    setIsLoading(true);

    try {
      const result = (await searchMovie(query)) as IMovie[] | undefined;
      updateSearchResults(result || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search_bar">
      <input placeholder="Search movie" type="text" onChange={handleInputChange} value={query} />
      <button className="search_btn" onClick={handleSearch}>
        <img src={search} alt="search btn" />
      </button>
    </div>
  );
}

export default Search;
