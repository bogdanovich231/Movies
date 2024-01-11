import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: localStorage.getItem('searchQuery') || '',
    searchResults: [],
    isLoading: false,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setQuery, setSearchResults, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
