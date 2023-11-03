import  {useState} from 'react';
import IMovie from '../Api/Api';

function ProductDetailed() {
  const [movie, setMovie] = useState<IMovie | null>(null);

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div className="product_detailed">
      <div className="img">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" />
      </div>
      <div className="information">
        <p>Movie ID: {movie.id}</p>
        <h3>{movie.title}</h3>
        <p className="description">{movie.overview}</p>
        <p className="release_date">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default ProductDetailed;
