import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormInput } from "../Interfaces/Interfaces";
import { RootState } from "../store";


interface FormState {
  data: IFormInput | null;
}

const initialState: FormState = {
  data: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<IFormInput>) => {
      state.data = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export const selectFormData = (state: RootState) => state.form.data;

export default formSlice.reducer;