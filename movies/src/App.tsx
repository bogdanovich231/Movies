import { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './Header/Header';
import IMovie from './Api/Api';
import Loading from './Loading/Loading';
import NotFound from './NotFound/NotFound';

const CatalogProducts = lazy(() => import('./CatalogProducts/CatalogProducts'));
const ProductDetailed = lazy(() => import('./ProductDetailed/ProductDetailed'));

function App() {
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [isLoading] = useState(false);

  const updateSearchResults = (results: IMovie[] | undefined) => {
    setSearchResults(results || []);
    console.log('update', results);
  };

  return (
    <Router>
      <div className="banner_start">
        <Header updateSearchResults={updateSearchResults} />
        <h2 className="title">
          We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed
          decision about which movie to watch.
        </h2>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <CatalogProducts searchResults={searchResults} isLoading={isLoading} />
              </Suspense>
            }
          />
          <Route
            path="page/:pageNumber"
            element={
              <Suspense fallback={<Loading />}>
                <CatalogProducts searchResults={searchResults} isLoading={isLoading} />
              </Suspense>
            }
          />
          <Route path="/movie/:id" element={<ProductDetailed />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
