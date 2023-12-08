import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMovie, { MovieDetailsState } from '../../Types/Types';

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<IMovie>) => {
      state.movie = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setMovie, setLoading } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;