import React, { useEffect } from 'react';
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
import PageSelect from '../PageSelect/PageSelect';
import Categories from '../Categories/Categories';

function CatalogProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useSelector((state: RootState) => state.rootReducer.search);
  const { currentPage, isLoading } = useSelector((state: RootState) => state.rootReducer.catalog);
  const pageSize = useSelector((state: RootState) => state.rootReducer.pageSize.value);
  const selectedGenre = useSelector((state: RootState) => state.rootReducer.genres.selectedGenre);

  const { data: searchResults, error } = useGetMoviesQuery({
    query,
    page: currentPage,
    pageSize,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        if (searchResults && searchResults.data) {
          const totalPages = Math.ceil(searchResults.data.movie_count / searchResults.data.limit);
          dispatch(setProducts(searchResults.data.movies || []));
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
  }, [dispatch, searchResults, currentPage, navigate, pageSize]);

  const filteredMovies = selectedGenre
    ? searchResults?.data?.movies?.filter((movie: IMovie) => movie.genres.includes(selectedGenre))
    : searchResults?.data?.movies;

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <>
      <div className="filter_movies">
        <PageSelect />
        <Categories />
      </div>
      <div className="catalog">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie: IMovie) => <ProductElement key={movie.id} movie={movie} />)
            ) : (
              <div className="movie_notfound">
                <h3>No movies found</h3>
              </div>
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
