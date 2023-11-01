import {  Suspense, lazy, useState } from 'react';
import './App.scss';
import Header from './Header/Header';
import IMovie from './Api/Api';
import Loading from './Loading/Loading';
const CatalogProducts = lazy(() => import('./CatalogProducts/CatalogProducts'));

function App() {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSearchResults = (results: IMovie[] | undefined) => {
    setSearchResults(results || []);
    console.log('update', results);
  }

  return (
    <div className="banner_start">
      <Header updateSearchResults={updateSearchResults} />
      <h2 className="title">
        We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed
        decision about which movie to watch.
      </h2>
      <Suspense fallback={<Loading />}>
        <CatalogProducts searchResults={searchResults} isLoading={isLoading} />
      </Suspense>
    </div>
  );
}

export default App;
