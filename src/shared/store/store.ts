import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {githubApi} from "../api/github.ts";
import {issueReducer} from "../../entities/Issue";

const rootReducer = combineReducers({
    [githubApi.reducerPath]: githubApi.reducer,
    issueReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware)
});