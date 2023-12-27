import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    products: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setProducts, setCurrentPage, setTotalPages, setLoading } = catalogSlice.actions;
export default catalogSlice.reducer;
