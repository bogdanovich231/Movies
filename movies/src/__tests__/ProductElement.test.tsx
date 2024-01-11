import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ProductElement from '../ProductElement/ProductElement';
import '@testing-library/jest-dom';

const mockStore = configureStore([thunk]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../Api/Api', () => ({
  ...jest.requireActual('../Api/Api'),
  getMovieById: jest.fn(),
}));

describe('ProductElement Component', () => {
  const mockMovie = {
    id: 28778,
    title: 'Mock Movie',
    large_cover_image: 'mock-image-url',
    rating: 7.5,
    year: 2021,
  };

  it('renders movie data correctly', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ProductElement movie={mockMovie} />
      </Provider>
    );

    expect(screen.getByText('Mock Movie')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('opens detailed movie component on button click', () => {
    const store = mockStore({});
    const mockNavigate = jest.fn() as jest.Mock;
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <ProductElement movie={mockMovie} />
      </Provider>
    );

    fireEvent.click(screen.getByText('View details'));

    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });

  it('calls additional API on button click', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <ProductElement movie={mockMovie} />
      </Provider>
    );
    fireEvent.click(screen.getByText('View details'));
  });
});
