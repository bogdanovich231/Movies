import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IMovie, { IPaginationData } from '../Types/Types';

const API_URL = 'https://yts.mx/api/v2';

export const searchMovie = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getMovies: builder.query<{ results: IMovie[]; pagination: IPaginationData }, { query: string; page: number }>({
      query: ({ query, page }) => `list_movies.json?query_term=${query}&page=${page}`,
    }),
    getMovieById: builder.query<IMovie, number>({
      query: (movieId) => `movie_details.json?movie_id=${movieId}`,
    }),
  }),
});                                

export const { useGetMoviesQuery, useGetMovieByIdQuery } = searchMovie;
