import React, { useEffect, useState } from 'react';
import IMovie from '../Types/Types';
import { getFavorites } from '../Helper/favorites';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Favorite.scss';
import zipperGrey from '../assets/zipper_grey.png';
import zipperGreen from '../assets/zipper_green.png';

const FavoriteList: React.FC = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const auth = getAuth();

    const fetchMovieData = async (movieIds: number[]) => {
      try {
        const fetchMovieInfo = async (movieId: number) => {
          const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`);
          const data = await response.json();
          return data.data.movie as IMovie;
        };

        const movieDataArray = await Promise.all(movieIds.map(fetchMovieInfo));
        setFavoriteMovies(movieDataArray);
      } catch (error) {
        console.error('Error when retrieving movie data', error);
      }
    };

    const fetchMovieIds = async (userId: string) => {
      try {
        const movieIdsString = await getFavorites(userId);
        const movieIds = movieIdsString.map(Number);

        if (movieIds.length > 0) {
          fetchMovieData(movieIds);
        }
      } catch (error) {
        console.error('Error when retrieving favorite movies', error);
      }
    };

    const authStateChangedListener = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        fetchMovieIds(userId);
      }
    });

    return () => {
      authStateChangedListener();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  return (
    <div className="favorite">
      <h2 className="favorite_title">Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <h3>No favorite movies</h3>
      ) : (
        <ul className="favorite_list">
          {favoriteMovies.map((movie) => (
            <li className="favorite_item" key={movie.id}>
              <img src={movie.large_cover_image} alt={movie.title} />
              <div className="favorite_item_info">
                <p>{movie.title}</p>
                <div className="favorite_item_info_rating">
                  {movie.rating < 7 ? <img src={zipperGrey} alt="" /> : <img src={zipperGreen} alt="" />}
                  <p className={`rating ${movie.rating < 7 ? 'grey' : 'green'}`}>{movie.rating}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteList;
