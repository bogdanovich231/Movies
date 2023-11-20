import IMovie from '../Types/Types';
import './ProductElement.scss';
import { useNavigate } from 'react-router-dom';

function ProductElement({ movie }: { movie: IMovie }) {
  const navigate = useNavigate();

  const openModal = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <div className="product">
      <div className="img">
        <img src={movie.large_cover_image} alt={movie.title} />
      </div>
      <div className="information">
        <h3>{movie.title}</h3>
        <p className="rating">{movie.rating}</p>
        <p className="release_date">{movie.year}</p>
        <div className="button">
          <button onClick={openModal}>View details</button>
        </div>
      </div>
    </div>
  );
}

export default ProductElement;
