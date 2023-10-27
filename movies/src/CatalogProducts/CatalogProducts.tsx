import IMovie from "../Api/Api";
import ProductElement from "../ProductElement/ProductElement";
import "./CatalogProducts.scss";

function CatalogProducts({ searchResults }: { searchResults: IMovie[] }) {
    console.log("catalog", searchResults);

    if (searchResults.length === 0) {
        return <div className="results_not_Found">Results not found</div>;
    }

    return (
        <div className="catalog">
            {searchResults.map((movie) => (
                <ProductElement key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default CatalogProducts;