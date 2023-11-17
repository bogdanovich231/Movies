import { useState, useEffect } from 'react';
import  { getMovieById } from '../Api/Api';
import { useParams } from 'react-router';
import Loading from '../Loading/Loading';
import IMovie from '../Types/Types';

function ProductDetailed() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        return;
      }

      try {
        const result = await getMovieById(parseInt(id));
        if (result) {
          setMovie(result);
        } else {
          console.log('Movie not found');
        }
      } catch (error) {
        console.log('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

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

  return (
    <div className="product_detailed">
      <div className="button">
        <button>X</button>
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
