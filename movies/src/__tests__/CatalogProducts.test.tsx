import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CatalogProducts from '../CatalogProducts/CatalogProducts';
import '@testing-library/jest-dom';

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
    render(<CatalogProducts searchResults={[]} isLoading={false} />);
    await waitFor(() => {
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

  it('navigates to the correct page when a card is clicked', async () => {
    render(<CatalogProducts searchResults={[]} isLoading={false} />);
    fireEvent.click(screen.getByText('Movie 1'));
    await waitFor(() => {
      expect(require('react-router-dom').useNavigate).toHaveBeenCalledWith('/page/1');
    });
  });
});
