import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './Header/Header';
import Loading from './Loading/Loading';
import NotFound from './NotFound/NotFound';
import MainPage from './MainPage/MainPage';

const CatalogProducts = lazy(() => import('./CatalogProducts/CatalogProducts'));
const ProductDetailed = lazy(() => import('./ProductDetailed/ProductDetailed'));

function App() {
  return (
    <Router>
      <MainPage />
        <Routes>
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
           <Route path="/movie/:id/" element={<ProductDetailed />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
