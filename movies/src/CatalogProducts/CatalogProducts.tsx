import  { useState, useEffect } from 'react';
import IMovie from '../Api/Api';
import Loading from '../Loading/Loading';
import ProductElement from '../ProductElement/ProductElement';
import Pagination from '../Pagination/Pagination';
import { IPaginationData, searchMovie } from '../Api/Api';
import { useNavigate } from 'react-router-dom';
import './CatalogProducts.scss';

interface CatalogProductsProps {
  searchResults: { results: IMovie[]; pagination: IPaginationData } | IMovie[];
  isLoading: boolean;
}

function CatalogProducts({
  searchResults,
  isLoading,
}: CatalogProductsProps) {
  const [products, setProducts] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery,] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProductsData = await searchMovie(searchQuery, currentPage);
        setProducts(allProductsData?.results || []);
        navigate(`/page/${currentPage}`);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

  if (Array.isArray(searchResults)) {
    return <div className="results_not_Found">Results not found</div>;
  }

  const totalPages = searchResults.pagination.total_pages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="catalog">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {products.map((movie) => (
            <ProductElement key={movie.id} movie={movie} />
          ))}
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
}

export default CatalogProducts;
