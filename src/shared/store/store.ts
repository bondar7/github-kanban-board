import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {issueReducer, issuesApi} from "../../entities/Issue";
import {repoReducer, repoApi} from "../../entities/Repo";

const rootReducer = combineReducers({
    [issuesApi.reducerPath]: issuesApi.reducer,
    [repoApi.reducerPath]: repoApi.reducer,
    issueReducer,
    repoReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(issuesApi.middleware, repoApi.middleware)
});