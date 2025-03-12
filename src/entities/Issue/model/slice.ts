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
        builder
            // FULFILLED
            .addMatcher(
                issuesApi.endpoints.getOpenIssues.matchFulfilled,
                (state, action) => {
                    state.issues = [...state.issues, ...action.payload];
                    state.isError_OpenIssues = false;
                    state.isLoading_OpenIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getInProgressIssues.matchFulfilled,
                (state, action) => {
                    state.issues = [...state.issues, ...action.payload];
                    state.isError_InProgressIssues = false;
                    state.isLoading_InProgressIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getClosedIssues.matchFulfilled,
                (state, action) => {
                    state.issues = [...state.issues, ...action.payload];
                    state.isError_ClosedIssues = false;
                    state.isLoading_ClosedIssues = false;
                }
            )
            // REJECTED
            .addMatcher(
                issuesApi.endpoints.getOpenIssues.matchRejected,
                (state) => {
                    state.isError_OpenIssues = true;
                    state.isLoading_OpenIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getInProgressIssues.matchRejected,
                (state) => {
                    state.isError_InProgressIssues = true;
                    state.isLoading_InProgressIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getClosedIssues.matchRejected,
                (state) => {
                    state.isError_ClosedIssues = true;
                    state.isLoading_ClosedIssues = false;
                }
            )
            // PENDING
            .addMatcher(
                issuesApi.endpoints.getOpenIssues.matchPending,
                (state) => {
                    state.isError_OpenIssues = false;
                    state.isLoading_OpenIssues = true;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getInProgressIssues.matchPending,
                (state) => {
                    state.isError_InProgressIssues = false;
                    state.isLoading_InProgressIssues = true;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getClosedIssues.matchPending,
                (state) => {
                    state.isError_ClosedIssues = false;
                    state.isLoading_ClosedIssues = true;
                }
            )
    },
});

export const { setIssues } = IssueSlice.actions;
export default IssueSlice.reducer;