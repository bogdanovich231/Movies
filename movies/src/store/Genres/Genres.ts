import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IMovie, { IGenresState } from '../../Types/Types';

const initialState: IGenresState = {
    genres: ["Drama", "Action", "Crime", "Mystery", "Thriller"],
    selectedGenre: null,
    moviesByGenre: {},
};

const genresSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<string[]>) => {
            state.genres = action.payload;
        },
        selectGenre: (state, action: PayloadAction<string | null>) => {
            state.selectedGenre = action.payload;
        },
        setMoviesByGenre: (state, action: PayloadAction<{ genre: string; movies: IMovie[] }>) => {
            const { genre, movies } = action.payload;
            state.moviesByGenre[genre] = movies;
        },
    },
});

export const { setGenres, selectGenre, setMoviesByGenre } = genresSlice.actions;
export default genresSlice.reducer;