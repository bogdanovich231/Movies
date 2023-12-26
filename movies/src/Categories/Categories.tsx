import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect, useState } from 'react';
import { selectGenre, setMoviesByGenre } from '../store/Genres/Genres';
import { useGetMoviesQuery } from '../Api/Api';
import IMovie from '../Types/Types';
import { setCurrentPage } from '../store/Pagination/Pagination.slice';
import './Categories.scss';

function Categories() {
  const dispatch = useDispatch();
  const { genres, selectedGenre } = useSelector((state: RootState) => state.rootReducer.genres);
  const { query } = useSelector((state: RootState) => state.rootReducer.search);
  const { currentPage } = useSelector((state: RootState) => state.rootReducer.catalog);
  const pageSize = useSelector((state: RootState) => state.rootReducer.pageSize.value);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: searchResults } = useGetMoviesQuery({ query, page: currentPage, pageSize });

  useEffect(() => {
    if (searchResults) {
      const moviesByGenre: Record<string, IMovie[]> = {};
      genres.forEach((genre) => {
        moviesByGenre[genre] = searchResults.data.movies.filter((movie) => movie.genres.includes(genre));
      });

      Object.keys(moviesByGenre).forEach((genre) => {
        dispatch(setMoviesByGenre({ genre, movies: moviesByGenre[genre] }));
      });
    }
  }, [dispatch, genres, searchResults]);

  const handleGenreClick = (genre: string) => {
    if (genre === selectedGenre) {
      dispatch(selectGenre(''));
    } else {
      dispatch(selectGenre(genre));
      dispatch(setCurrentPage(1));
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`categories ${menuOpen ? 'menu-open' : ''}`}>
      <div className="menu-button" onClick={toggleMenu}>
        Categories
      </div>
      <div className="nav_container">
        <ul>
          {genres.map((genre: string) => (
            <li
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={genre === selectedGenre ? 'selected' : ''}
            >
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
