import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './Header/Header';
import Loading from './Loading/Loading';
import NotFound from './NotFound/NotFound';
import Footer from './Footer/Footer';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

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
          <Route path="autorization" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
