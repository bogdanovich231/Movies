import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
import { useGetMovieByIdQuery } from '../Api/Api';
import { setLoading, setMovie } from '../store/Detailed/Detailed.slice';
import { RootState } from '../store/store';
import IMovie from '../Types/Types';

function ProductDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.rootReducer.movieDetails.movie as IMovie | null);
  const loading = useSelector((state: RootState) => state.rootReducer.movieDetails.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        return;
      }

      try {
        dispatch(setLoading(true));
        const result = await useGetMovieByIdQuery(parseInt(id)).data;
        if (result) {
          dispatch(setMovie(result));
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
  }, [dispatch, id]);

  if (loading) {
    return (
      <div data-testid="loading">
        <Loading />
      </div>
    );
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleOnCloseClick = () => {
    navigate('/');
  };

  return (
    <div className="product_detailed">
      <div className="button">
        <button onClick={handleOnCloseClick}>X</button>
      </div>
      <div className="img">
        <img src={movie.large_cover_image} alt={movie.title} />
      </div>
      <div className="information">
        <p>Movie ID: {movie.id}</p>
        <h3>{movie.title}</h3>
        <p className="description">{movie.rating}</p>
        <p className="release_date">{movie.year}</p>
      </div>
    </div>
  );
}

export default ProductDetailed;
