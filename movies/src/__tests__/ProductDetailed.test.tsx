// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import ProductDetailed from '../ProductDetailed/ProductDetailed';
// import '@testing-library/jest-dom';
// import { useGetMovieByIdQuery } from '../Api/Api';
// import IMovie from '../Types/Types';
// import { QueryActionCreatorResult, QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

// jest.mock('react-router', () => ({
//   ...jest.requireActual('react-router'),
//   useParams: jest.fn().mockReturnValue({ id: '28778' }),
// }));

// const mockStore = configureStore();

// jest.mock('../Api/Api', () => ({
//   ...jest.requireActual('../Api/Api'),
//   useGetMovieByIdQuery: jest.fn(),
// }));

// describe('ProductDetailed Component', () => {
//   const mockMovie = {
//     large_cover_image: 'image-url',
//     title: 'Mock Movie',
//     year: 2015,
//     id: 28778,
//     rating: 7.5,
//   } as IMovie;

//   it('displays loading indicator while fetching data', async () => {
//     (useGetMovieByIdQuery as jest.MockedFunction<typeof useGetMovieByIdQuery>).mockReturnValue({
//         data: null,
//         error: null,
//         isLoading: true,
//         refetch: function (): QueryActionCreatorResult<QueryDefinition<number, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, IMovie, 'api'>> {
//             throw new Error('Function not implemented.');
//         }
//     });

//     const store = mockStore({
//       rootReducer: {
//         movieDetails: {
//           movie: null,
//           loading: true,
//         },
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ProductDetailed />
//       </Provider>
//     );

//     expect(screen.getByTestId('loading')).toBeInTheDocument();
//     await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull(), { timeout: 5000 });
//   });

//   it('displays detailed movie data correctly', async () => {
//     (useGetMovieByIdQuery as jest.MockedFunction<typeof useGetMovieByIdQuery>).mockReturnValue({
//         data: { data: mockMovie },
//         error: null,
//         isLoading: false,
//         refetch: function (): QueryActionCreatorResult<QueryDefinition<number, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, IMovie, 'api'>> {
//             throw new Error('Function not implemented.');
//         }
//     });

//     const store = mockStore({
//       rootReducer: {
//         movieDetails: {
//           movie: null,
//           loading: false,
//         },
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ProductDetailed />
//       </Provider>
//     );

//     await waitFor(() => expect(screen.getByText('Mock Movie')).toBeInTheDocument());
//     expect(screen.getByText(`Movie ID: ${mockMovie.id}`)).toBeInTheDocument();
//     expect(screen.getByText(`${mockMovie.rating}`)).toBeInTheDocument();
//     expect(screen.getByText(`${mockMovie.year}`)).toBeInTheDocument();
//   });

//   it('displays "Movie not found" when movie is not available', async () => {
//     const store = mockStore({
//       rootReducer: {
//         movieDetails: {
//           movie: null,
//           loading: false,
//         },
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ProductDetailed />
//       </Provider>
//     );

//     await waitFor(() => expect(screen.getByText('Movie not found')).toBeInTheDocument());
//   });

//   it('hides the component on close button click', async () => {
//     const store = mockStore({
//       rootReducer: {
//         movieDetails: {
//           movie: mockMovie,
//           loading: false,
//         },
//       },
//     });

//     render(
//       <Provider store={store}>
//         <ProductDetailed />
//       </Provider>
//     );

//     await waitFor(() => expect(screen.getByText('Mock Movie')).toBeInTheDocument());

//     fireEvent.click(screen.getByText('X'));

//     await waitFor(() => expect(screen.queryByText('Mock Movie')).toBeNull());
//   });
// });
