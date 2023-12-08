import { useGetMovieByIdQuery } from '../Api/Api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
import { setLoading, setMovie } from '../store/Detailed/Detailed.slice';
import { RootState } from '../store/store';
import IMovie from '../Types/Types';

function ProductDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.rootReducer.movieDetails.movie);
  console.log('Movie from Redux state:', movie);
  const loading = useSelector((state: RootState) => state.rootReducer.movieDetails.loading);
  const navigate = useNavigate();

  const { data: result } = useGetMovieByIdQuery(parseInt(id || ''));
  console.log('ProductDetailed component is rendering');
  console.log('Movie ID from URL:', id);
  console.log('Query result:', result);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        return;
      }

      try {
        dispatch(setLoading(true));

        if (result && 'data' in result) {
          const movieData: IMovie = result.data.movie;

          console.log('Movie data:', movieData);

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

  console.log('Movie:', movie);

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
          <div className="img">
            <img src={movie.large_cover_image} alt={movie.title} />
          </div>
          <div className="information">
            <p>Movie ID: {movie.id}</p>
            <h3>{movie.title}</h3>
            <p className="description">{movie.rating}</p>
            <p className="release_date">{movie.year}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetailed;
