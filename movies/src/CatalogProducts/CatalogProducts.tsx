import IMovie from '../Api/Api';
import Loading from '../Loading/Loading';
import ProductElement from '../ProductElement/ProductElement';
import './CatalogProducts.scss';

function CatalogProducts({ searchResults, isLoading }: { searchResults: IMovie[]; isLoading: boolean }) {
  console.log('catalog', searchResults);

  if (searchResults.length === 0) {
    return <div className="results_not_Found">Results not found</div>;
  }

  return (
    <div className="catalog">
      {isLoading ? <Loading /> : searchResults.map((movie) => <ProductElement key={movie.id} movie={movie} />)}
    </div>
  );
}

export default CatalogProducts;
