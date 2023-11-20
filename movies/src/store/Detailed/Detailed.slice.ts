import { createSlice } from '@reduxjs/toolkit';

const productDetailSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    movie: null,
    loading: true,
  },
  reducers: {
    setMovie: (state, action) => {
      state.movie = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovie, setLoading } = productDetailSlice.actions;
export default productDetailSlice.reducer;
 