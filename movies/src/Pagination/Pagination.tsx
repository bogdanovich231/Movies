import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Pagination.scss';
import { PaginationProps } from '../Types/Types';
import { RootState } from '../store/store';
import { setCurrentPage } from '../store/Pagination/Pagination.slice';

const Pagination: FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const dispatch = useDispatch();
  const CurrentPage = useSelector((state: RootState) => state.rootReducer.pagination.currentPage);

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
      className={CurrentPage === pageNumber ? 'active' : 'pagination_btn'}
    >
      {pageNumber}
    </button>
  ));

  const lastPages = pageNumbers.slice(totalPages - visiblePages).map((pageNumber) => (
    <button
      key={pageNumber}
      onClick={() => handlePageChange(pageNumber)}
      className={CurrentPage === pageNumber ? 'active' : 'pagination_btn'}
    >
      {pageNumber}
    </button>
  ));

  const middleDots = totalPages > visiblePages * 2 + 1 && <span className="pagination_dots">...</span>;

  const currentPageElement = <button key={CurrentPage} className="active">{CurrentPage}</button>;

  const renderPages = () => {
    if (totalPages <= 7) {
      return pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={CurrentPage === pageNumber ? 'active' : 'pagination_btn'}
        >
          {pageNumber}
        </button>
      ));
    } else {
      return (
        <>
          {firstPages}
          {middleDots}
          {currentPageElement}
          {middleDots}
          {lastPages}
        </>
      );
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination_btn pagination_btn_left"
        onClick={() => handlePageChange(CurrentPage - 1)}
        disabled={CurrentPage === 1}
      >
        &#60;
      </button>
      {renderPages()}
      <button
        className="pagination_btn pagination_btn_right"
        onClick={() => handlePageChange(CurrentPage + 1)}
        disabled={CurrentPage === totalPages}
      >
        &#62;
      </button>
    </div>
  );
};

export default Pagination;
