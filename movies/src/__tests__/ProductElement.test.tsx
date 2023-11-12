import { render, screen, fireEvent } from '@testing-library/react';
import ProductElement from '../ProductElement/ProductElement';
import { getMovieById } from '../Api/Api';

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
    id: 123,
    title: 'Mock Movie',
    large_cover_image: 'mock-image-url',
    rating: 7.5,
    year: 2021,
  };

  it('renders movie data correctly', () => {
    render(<ProductElement movie={mockMovie} />);

    expect(screen.getByText('Mock Movie')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('opens detailed movie component on button click', () => {
    const mockNavigate = jest.fn() as jest.Mock;
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(<ProductElement movie={mockMovie} />);

    fireEvent.click(screen.getByText('View details'));

    expect(mockNavigate).toHaveBeenCalledWith(`movie/${mockMovie.id}`);
  });

  it('calls additional API on button click', async () => {
    render(<ProductElement movie={mockMovie} />);

    fireEvent.click(screen.getByText('View details'));

    await expect(getMovieById).toHaveBeenCalledWith(mockMovie.id);
  });
});
