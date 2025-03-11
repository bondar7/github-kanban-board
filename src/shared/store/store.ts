import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {githubApi} from "../api/github.ts";
import {issueReducer} from "../../entities/Issue";
import {repoReducer} from "../../entities/Repo";

const rootReducer = combineReducers({
    [githubApi.reducerPath]: githubApi.reducer,
    issueReducer,
    repoReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(githubApi.middleware)
});