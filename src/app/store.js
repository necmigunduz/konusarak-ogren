import { configureStore } from "@reduxjs/toolkit";
import { namesApi } from "../api/api";

export const store = configureStore({
    reducer: {
        [namesApi.reducerPath]: namesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(namesApi.middleware)
});