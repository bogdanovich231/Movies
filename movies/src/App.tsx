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
    <Suspense fallback={<Loading />}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<CatalogProducts />} />
          <Route path="page/:pageNumber" element={<CatalogProducts />} />
          <Route path="page/:pageNumber/movie/:id" element={<ProductDetailed />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
