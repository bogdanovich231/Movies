import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../SearchBar/SearchBar';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('Search Component', () => {
  it('saves the entered value to local storage when the search button is clicked', async () => {
    const store = mockStore({}); 
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search movie');
    const searchButton = screen.getByRole('button', { name: 'search btn' });

    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    fireEvent.click(searchButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: 'search/setQuery', payload: 'Inception' });
  });

  it('retrieves the value from local storage on mount', async () => {
    const initialState = {
      search: { query: 'The Dark Knight' },
    };
    const store = mockStore(initialState); 
    render(
      <Provider store={store}>
        <Search  />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search movie');
    expect(searchInput).toHaveValue('The Dark Knight');
  });
});
