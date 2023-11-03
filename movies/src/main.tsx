import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx';
import NotFound from './NotFound/NotFound.tsx';
import ProductDetailed from './ProductDetailed/ProductDetailed.tsx';
import CatalogProducts from './CatalogProducts/CatalogProducts.tsx';
import { searchMovie } from './Api/Api.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "movie/:id",
        element: <ProductDetailed  />
    
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />
  },
 
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
