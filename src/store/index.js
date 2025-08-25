import { configureStore } from "@reduxjs/toolkit";
import listMovieSlice from "../pages/HomeTemplate/ListMoviePage/slice";

export const store = configureStore({
    reducer: {
        listMovieSlice,
    },
    
});