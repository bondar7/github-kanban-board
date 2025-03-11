import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {issueReducer, issuesApi} from "../../entities/Issue";
import {repoReducer} from "../../entities/Repo";

const rootReducer = combineReducers({
    [issuesApi.reducerPath]: issuesApi.reducer,
    issueReducer,
    repoReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(issuesApi.middleware)
});