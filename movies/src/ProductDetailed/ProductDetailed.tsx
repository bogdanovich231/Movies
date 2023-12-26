import { useGetMovieByIdQuery } from '../Api/Api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
import { setLoading, setMovie } from '../store/Detailed/Detailed.slice';
import { RootState } from '../store/store';
import IMovie from '../Types/Types';
import './ProductDetailed.scss';
import zipperGrey from '../assets/zipper_grey.png';
import zipperGreen from '../assets/zipper_green.png';
import FavoriteButton from '../Favorite/FavoriteButton';

function ProductDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.rootReducer.movieDetails.movie);
  console.log('Movie from Redux state:', movie);
  const loading = useSelector((state: RootState) => state.rootReducer.movieDetails.loading);
  const navigate = useNavigate();

  const { data: result } = useGetMovieByIdQuery(parseInt(id || ''));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        return;
      }

      try {
        dispatch(setLoading(true));

        if (result && 'data' in result) {
          const movieData: IMovie = result.data.movie;

          if (movieData) {
            dispatch(setMovie(movieData));
          } else {
            console.log('Movie not found');
          }
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.log('Error loading movie:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMovieDetails();
  }, [dispatch, id, result]);

  if (loading) {
    return (
      <div data-testid="loading">
        <Loading />
      </div>
    );
  }

  const handleOnCloseClick = () => {
    navigate('/');
  };

  return (
    <div className="product_detailed">
      {!movie && <div>Movie not found</div>}
      {movie && (
        <>
          <div className="information">
            <button className="close_btn" onClick={handleOnCloseClick}>
              X
            </button>
            <h1>{movie.title}</h1>
            <div className="meta_data_container">
              <p className={`rating ${movie.rating < 7 ? 'grey' : 'green'}`}>{movie.rating}</p>
              {movie.rating < 7 ? <img src={zipperGrey} alt="" /> : <img src={zipperGreen} alt="" />}
              <p className="release_date">{movie.year},</p>
              <p className="genres">{movie.genres.join(', ')} </p>
            </div>
            {movie.description_full ? (
              <p className="description">{`${movie.description_full.slice(0, 500)}...`}</p>
            ) : null}
            <div className="container_button">
              <button className=" install_btn">Install movie</button>
              <FavoriteButton />
            </div>
          </div>
          {movie.yt_trailer_code ? (
            <div className="trailer">
              <iframe
                width={1000}
                height={500}
                src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                title={`Trailer for ${movie.title}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="img">
              <img src={movie.large_cover_image} alt="" />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductDetailed;
