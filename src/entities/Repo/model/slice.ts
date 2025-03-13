import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {repoInitialState as initialState} from "./initialState.ts";
import {Repo} from "./types.ts";
import {repoApi} from "../api/repoApi.ts";

const repoSlice = createSlice({
    name: "repo",
    initialState,
    reducers: {
        setRepo: (state, action: PayloadAction<Repo>) => {
            state.repo = action.payload;
        },
        setRepoFullName: (state, action: PayloadAction<string>) => {
            state.repoFullName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(repoApi.endpoints.getRepo.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addMatcher(repoApi.endpoints.getRepo.matchFulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.repo = action.payload;
        });
        builder.addMatcher(repoApi.endpoints.getRepo.matchRejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.repo = null;
        });
    }
});

export const { setRepo, setRepoFullName } = repoSlice.actions;
export default repoSlice.reducer;