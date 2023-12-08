import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slice/FormSlice";
import countryReducer from "./slice/CountriesSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
