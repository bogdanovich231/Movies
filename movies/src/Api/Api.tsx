import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IMovie, { IDataResponse } from '../Types/Types';

const API_URL = 'https://yts.mx/api/v2';

export const searchMovie = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<{ data: IDataResponse }, { query: string; page: number; pageSize: number }>({
      query: ({ query, page, pageSize }) => `list_movies.json?query_term=${query}&page=${page}&limit=${pageSize}`,
    }),
    getMovieById: builder.query<IMovie, number>({
      query: (movieId) => `movie_details.json?movie_id=${movieId}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery } = searchMovie;
