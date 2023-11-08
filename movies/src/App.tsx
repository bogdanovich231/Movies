import { Suspense, lazy, useState } from 'react';
import './App.scss';
import Header from './Header/Header';
import IMovie from './Api/Api';
import Loading from './Loading/Loading';
import ErrorBoundary from './ErrorBoundary/ErrorBoundery';
import ErrorMessage from './ErrorBoundary/ErrorMessage';
import Pagination from './Pagination/Pagination';
const CatalogProducts = lazy(() => import('./CatalogProducts/CatalogProducts'));

function App() {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [searchQuery, ] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  const updateSearchResults = (data: { results: IMovie[], pagination: { total_pages: number } } | undefined) => {
    if (data) {
      setSearchResults(data.results);
      setTotalPages(data.pagination.total_pages);
    }
  };
    console.log("1",searchResults)
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <div className="banner_start">
        <Header
          updateSearchResults={updateSearchResults}
        />
        <h2 className="title">
          We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed
          decision about which movie to watch.
        </h2>
        <Suspense fallback={<Loading />}>
  <CatalogProducts searchResults={searchResults} />
  <Pagination
  total_pages={totalPages}
  query={searchQuery}
  updateSearchResults={updateSearchResults}
/>
</Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;

