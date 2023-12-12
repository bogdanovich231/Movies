import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Pagination.scss';
import { PaginationProps } from '../Types/Types';
import { RootState } from '../store/store';
import { setCurrentPage } from '../store/Pagination/Pagination.slice';

const Pagination: FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const dispatch = useDispatch();
  const reduxCurrentPage = useSelector((state: RootState) => state.rootReducer.pagination.currentPage);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    onPageChange(page);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const visiblePages = 2;

  const firstPages = pageNumbers.slice(0, visiblePages).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={reduxCurrentPage === pageNumber ? 'active' : 'pagination_btn'}
    >
      {pageNumber}
    </button>
  ));

  const lastPages = pageNumbers.slice(totalPages - visiblePages, totalPages).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={reduxCurrentPage === pageNumber ? 'active' : 'pagination_btn'}
    >
      {pageNumber}
    </button>
  ));

  const middleDots = totalPages > visiblePages * 2 + 1 && <span className="pagination_dots">...</span>;

  const currentPage = totalPages > visiblePages * 2 && <button className="active">{reduxCurrentPage}</button>;

  return (
    <div className="pagination">
      <button
        className="pagination_btn pagination_btn_left"
        onClick={() => handlePageChange(reduxCurrentPage - 1)}
        disabled={reduxCurrentPage === 1}
      >
        &#60;
      </button>
      {firstPages}
      {middleDots}
      {currentPage}
      {middleDots}
      {lastPages}
      <button
        className="pagination_btn pagination_btn_right"
        onClick={() => handlePageChange(reduxCurrentPage + 1)}
        disabled={reduxCurrentPage === totalPages}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
