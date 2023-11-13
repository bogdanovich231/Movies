import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../SearchBar/SearchBar';
import '@testing-library/jest-dom';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Search Component', () => {
  it('saves the entered value to local storage when the search button is clicked', async () => {
    render(<Search updateSearchResults={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search movie');
    const searchButton = screen.getByRole('button', { name: 'search btn' });

    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    fireEvent.click(searchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('searchQuery', 'Inception');
  });

  it('retrieves the value from local storage on mount', async () => {
    localStorageMock.getItem.mockReturnValueOnce('The Dark Knight');

    render(<Search updateSearchResults={() => {}} />);

    const searchInput = screen.getByPlaceholderText('Search movie');

    expect(searchInput).toHaveValue('The Dark Knight');
  });
});
