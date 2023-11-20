import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import ProductElement from '../ProductElement/ProductElement';
import Pagination from '../Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import './CatalogProducts.scss';
import IMovie from '../Types/Types';
import { useGetMoviesQuery } from '../Api/Api';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages, setCurrentPage, setProducts, setLoading } from '../store/Catalog/catalog.slice';
import { RootState } from '../store/store';

function CatalogProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: searchResults, error } = useGetMoviesQuery({ query: '', page: 1 });
  const { query } = useSelector((state: RootState) => state.rootReducer.search);

  const { currentPage, isLoading } = useSelector((state: RootState) => state.rootReducer.catalog);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        
        const searchQuery = query || '';
        const searchResults = await useGetMoviesQuery({ query: searchQuery, page: currentPage });

        if (searchResults) {
          const totalPages = Math.ceil(searchResults.data.movie_count / searchResults.data.limit);
          dispatch(setProducts(searchResults.data.movies));
          dispatch(setTotalPages(totalPages));
          navigate(`/page/${currentPage}`);
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, searchResults, currentPage, navigate]);

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="catalog">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {searchResults?.data.movies && searchResults.data.movies.length > 0 ? (
              searchResults.data.movies.map((movie: IMovie) => (
                <ProductElement key={movie.id} movie={movie} />
              ))
            ) : (
              <div>No results found</div>
            )}
          </>
        )}
      </div>
      {searchResults?.data && (
        <Pagination
          totalPages={Math.ceil(searchResults.data.movie_count / searchResults.data.limit) || 1}
          currentPage={currentPage}
          onPageChange={(page: number) => dispatch(setCurrentPage(page))}
        />
      )}
    </>
  );
}

export default CatalogProducts;
