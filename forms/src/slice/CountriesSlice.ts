import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type FetchCountriesResponse = string[];

export const fetchCountries = createAsyncThunk<FetchCountriesResponse, void>(
  "countries/fetchCountries",
  async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    const countries = data.map(
      (country: any) => country.name.common,
    ) as FetchCountriesResponse;
    return countries;
  },
);

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    list: [] as string[],
    status: "idle" as "idle" | "loading" | "succeeded" | "failed",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default countrySlice.reducer;
