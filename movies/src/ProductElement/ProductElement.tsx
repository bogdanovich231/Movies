import IMovie from '../Types/Types';
import './ProductElement.scss';
import { useNavigate, useParams } from 'react-router-dom';
import zipperGrey from '../assets/zipper_grey.png';
import zipperGreen from '../assets/zipper_green.png';

function ProductElement({ movie }: { movie: IMovie }) {
  const navigate = useNavigate();
  const { page } = useParams();

  const openModal = () => {
    navigate(`/page/${page ?? 1}/movie/${movie.id}`);
  };

  return (
    <div className="product">
      <div className="img">
        <img src={movie.large_cover_image} alt={movie.title} />
      </div>
      <div className="information">
        <h3>{movie.title}</h3>
        <div className="meta_data_container">
          <div className="rating">
            {movie.rating < 7 ? <img src={zipperGrey} alt="" /> : <img src={zipperGreen} alt="" />}
            <p className={`rating ${movie.rating < 7 ? 'grey' : 'green'}`}>{movie.rating}</p>
          </div>
          <p className="release_date">Release: {movie.year}</p>
        </div>
        <div className="button">
          <button onClick={openModal}>View details</button>
        </div>
      </div>
    </div>
  );
}

export default ProductElement;
