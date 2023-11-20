import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CatalogProducts from '../CatalogProducts/CatalogProducts';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { store } from '../store/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../Api/Api', () => ({
  ...jest.requireActual('../Api/Api'),
  getMovies: jest.fn().mockResolvedValue([
    {
      id: 1,
      title: 'Movie 1',
      rating: 7.9,
      year: 2023,
      large_cover_image: 'string',
    },
    {
      id: 2,
      title: 'Movie 2',
      rating: 8.0,
      year: 2023,
      large_cover_image: 'string',
    },
  ]),
}));

describe('CatalogProducts Component', () => {
  it('renders the correct number of cards', async () => {
    render(
      <Provider store={store}>
        <CatalogProducts />
      </Provider>
    );
    await waitFor(() => {
      const movie1Elements = screen.queryAllByText('Movie 1');
      expect(movie1Elements.length).toBeGreaterThan(0);
      movie1Elements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('navigates to the correct page when a card is clicked', async () => {
    render(
      <Provider store={store}>
        <CatalogProducts />
      </Provider>
    );
    fireEvent.click(screen.getByText('Movie 1'));
    await waitFor(() => {
      expect(require('react-router-dom').useNavigate).toHaveBeenCalledWith('/page/1');
    });
  });
});
