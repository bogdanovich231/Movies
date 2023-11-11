import { useState, useEffect } from 'react';
import IMovie, { getMovieById } from '../Api/Api';
import { useParams } from 'react-router';

function ProductDetailed() {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        return;
      }

      const result = await getMovieById(parseInt(id));
      if (result) {
        setMovie(result);
      } else {
        console.error('Фильм не найден');
      }

      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div className="product_detailed">
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