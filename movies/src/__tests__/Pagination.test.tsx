import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

describe('Pagination Component', () => {
  const totalPages = 5;

  it('updates URL query parameter when page changes', () => {
    const store = mockStore({
      rootReducer: {
        pagination: {
          currentPage: 3,
        },
      },
    });

    const onPageChange = jest.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Pagination currentPage={3} totalPages={totalPages} onPageChange={onPageChange} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('4'));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
