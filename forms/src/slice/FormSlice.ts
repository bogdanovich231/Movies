import { createSlice } from "@reduxjs/toolkit";
import { IFormInput } from "../Interfaces/Interfaces";



const formSlice = createSlice({
  name: 'form',
  initialState: { data: {} as IFormInput },
  reducers: {
    setFormData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;

export default formSlice.reducer;