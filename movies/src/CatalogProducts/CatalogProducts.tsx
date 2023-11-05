import IMovie from '../Api/Api';
import ProductElement from '../ProductElement/ProductElement';
import './CatalogProducts.scss';
import { Outlet, Link } from 'react-router-dom';

function CatalogProducts({ searchResults }: { searchResults: IMovie[] }) {
  if (searchResults.length === 0) {
    return <div className="results_not_Found">Results not found</div>;
  }

  return (
    <div className="catalog">
      {searchResults.map((movie) => (
        <Link key={movie.id} to={`movie/${movie.id}`}>
          <ProductElement key={movie.id} movie={movie} />
        </Link>
      ))}
      <Outlet />
    </div>
  );
}

export default CatalogProducts;
