import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

describe('Pagination Component', () => {
  const totalPages = 5;

  it('updates URL query parameter when page changes', () => {
    const onPageChange = jest.fn();
    const currentPage = 3;

    render(
      <BrowserRouter>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('4'));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
