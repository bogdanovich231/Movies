import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import CatalogProducts from './CatalogProducts/CatalogProducts.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <CatalogProducts />
  </React.StrictMode>
);
