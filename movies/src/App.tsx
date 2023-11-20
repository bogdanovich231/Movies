import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './Header/Header';
import Loading from './Loading/Loading';
import NotFound from './NotFound/NotFound';

const CatalogProducts = lazy(() => import('./CatalogProducts/CatalogProducts'));
const ProductDetailed = lazy(() => import('./ProductDetailed/ProductDetailed'));

function App() {
  return (
    <Router>
      <div className="banner_start">
        <Header />
        <h2 className="title">
          We provide detailed descriptions of each film, trailers, ratings, and reviews to help you make an informed
          decision about which movie to watch.
        </h2>
        <Routes>
          <Route path="/movie/:id" element={<ProductDetailed />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <CatalogProducts />
              </Suspense>
            }
          />
          <Route
            path="page/:pageNumber"
            element={
              <Suspense fallback={<Loading />}>
                <CatalogProducts />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
