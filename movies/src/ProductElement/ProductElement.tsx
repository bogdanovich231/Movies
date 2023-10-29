import './ProductElement.scss';
import IMovie from '../Api/Api';

function ProductElement({ movie }: { movie: IMovie }) {
  console.log('Product elem', movie);
  return (
    <div className="product">
      <div className="img">
        <img src={movie.poster_path} alt="" />
      </div>
      <div className="information">
        <h3>{movie.title}</h3>
        <p className="description">{`${movie.overview.slice(0, 70)}...`}</p>
        <p className="release_date">{movie.release_date}</p>
      </div>
    </div>
  );
}

export default ProductElement;
