import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetailed from '../ProductDetailed/ProductDetailed';
import { getMovieById } from '../Api/Api';
import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: jest.fn().mockReturnValue({ id: '28778' }),
}));

jest.mock('../Api/Api', () => ({
  ...jest.requireActual('../Api/Api'),
  getMovieById: jest.fn() as jest.MockedFunction<typeof getMovieById>,
}));

describe('ProductDetailed Component', () => {
  const mockMovie = {
    id: 28778,
    title: 'Mock Movie',
    large_cover_image: 'image-url',
    rating: 7.5,
    year: 2015,
  };

  beforeEach(() => {
    (getMovieById as jest.MockedFunction<typeof getMovieById>).mockResolvedValueOnce(mockMovie);
  });

  it('displays loading indicator while fetching data', async () => {
    render(<ProductDetailed />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull(), { timeout: 5000 });
  });

  it('displays detailed movie data correctly', async () => {
    render(<ProductDetailed />);
    await waitFor(() => expect(screen.getByText('Mock Movie')).toBeInTheDocument());
    expect(screen.getByText('Movie ID: 123')).toBeInTheDocument();
    expect(screen.getByText('7.5')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('displays "Movie not found" when movie is not available', async () => {
    (getMovieById as jest.MockedFunction<typeof getMovieById>).mockResolvedValueOnce(mockMovie);
    render(<ProductDetailed />);
    await waitFor(() => expect(screen.getByText('Movie not found')).toBeInTheDocument());
  });

  it('hides the component on close button click', async () => {
    render(<ProductDetailed />);
    await waitFor(() => expect(screen.getByText('Mock Movie')).toBeInTheDocument());

    fireEvent.click(screen.getByText('X'));

    await waitFor(() => expect(screen.queryByText('Mock Movie')).toBeNull());
  });
});
