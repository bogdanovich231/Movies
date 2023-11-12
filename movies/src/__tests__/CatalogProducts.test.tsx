import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogProducts from '../CatalogProducts/CatalogProducts';

jest.mock('../Api/Api', () => ({
  ...jest.requireActual('../Api/Api'),
  searchMovie: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('CatalogProducts Component', () => {

    const mockSearchResults = {
        results: [
          {
            id: 1234,
            title: 'Movie 1',
            large_cover_image: 'string',
            year: 2023,
            rating: 7.9,
          },
        ],
        pagination: {
          total_pages: 2,
          movie_count: 1,
          limit: 10, 
        },
      };
      
  it('renders the correct number of cards', async () => {
    require('../Api/Api').searchMovie.mockResolvedValueOnce(mockSearchResults);

    render(<CatalogProducts searchResults={mockSearchResults} isLoading={false} />);

    await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('displays a message if no cards are found', async () => {
    require('../Api/Api').searchMovie.mockResolvedValueOnce({ results: [] });

    render(<CatalogProducts searchResults={[]} isLoading={false} />);

    await waitFor(() => expect(screen.getByText('Results not found')).toBeInTheDocument());
  });

  it('navigates to the correct page when a card is clicked', async () => {
    require('../Api/Api').searchMovie.mockResolvedValueOnce(mockSearchResults);

    render(<CatalogProducts searchResults={mockSearchResults} isLoading={false} />);

    await waitFor(() => expect(screen.getByText('Movie 1')).toBeInTheDocument());

    userEvent.click(screen.getByText('Movie 1'));

    expect(require('react-router-dom').useNavigate).toHaveBeenCalledWith('/page/1');
  });

});
