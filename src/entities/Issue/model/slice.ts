import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IssuesInitialState as initialState} from "./initialState.ts";
import {Issue} from "./types.ts";
import {issuesApi} from "../api/issuesApi.ts";

const IssueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {
        setIssues: (state, action: PayloadAction<Issue[]>) => {
            state.issues = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(issuesApi.endpoints.getIssues.matchPending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.issues = [];
        });
        builder.addMatcher(issuesApi.endpoints.getIssues.matchFulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.issues = action.payload;
        });
        builder.addMatcher(issuesApi.endpoints.getIssues.matchRejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.issues = [];
        });
    }
});

export const { setIssues } = IssueSlice.actions;
export default IssueSlice.reducer;