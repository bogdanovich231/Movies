import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { searchMovie } from '../Api/Api'; 

import searchReducer from './search/search.slice';
import paginationReducer from './Pagination/Pagination.slice';
import catalogReducer from './Catalog/catalog.slice'; 
import movieDetailsReducer from './Detailed/Detailed.slice';
import pageSelectReducer from './PageSelect/PageSelect';

export const rootReducer = combineReducers({
  search: searchReducer,
  pagination: paginationReducer,
  catalog: catalogReducer, 
  movieDetails: movieDetailsReducer,
  pageSize:pageSelectReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    [searchMovie.reducerPath]: searchMovie.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(searchMovie.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;