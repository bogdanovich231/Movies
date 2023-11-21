import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPageSize } from '../store/PageSelect/PageSelect';


const PageSelect: React.FC = () => {
  const dispatch = useDispatch();
  const pageSize = useSelector((state: RootState) => state.rootReducer.pageSize.value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    dispatch(setPageSize(newSize));
  };

  return (
    <div>
      <label htmlFor="pageSize">Show: </label>
      <select id="pageSize" value={pageSize} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default PageSelect;
