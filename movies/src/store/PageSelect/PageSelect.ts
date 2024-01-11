import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PageSizeState {
  value: number;
}

const initialState: PageSizeState = {
  value: 20,
};

const pageSizeSlice = createSlice({
  name: 'pageSize',
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setPageSize } = pageSizeSlice.actions;
export default pageSizeSlice.reducer;
