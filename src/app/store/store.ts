import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {githubApi} from "../../shared/api/github.ts";

const rootReducer = combineReducers({
    [githubApi.reducerPath]: githubApi.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware)
});