import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IssuesInitialState as initialState} from "./initialState.ts";
import {Issue, IssueState} from "./types.ts";
import {issuesApi} from "../api/issuesApi.ts";

const IssueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {
        setOpenIssues: (state, action: PayloadAction<Issue[]>) => {
            state.openIssues = action.payload;
        },
        setInProgressIssues: (state, action: PayloadAction<Issue[]>) => {
            state.inProgressIssues = action.payload;
        },
        setClosedIssues: (state, action: PayloadAction<Issue[]>) => {
            state.closedIssues = action.payload;
        },
        updateIssueState: (state, action: PayloadAction<{ id: number, newState: IssueState, destinationIndex: number }>) => {
            const { id, newState, destinationIndex } = action.payload;

            let sourceListKey: keyof typeof state | null = null;
            let issue: Issue | undefined;

            for (const key of ["openIssues", "inProgressIssues", "closedIssues"] as const) {
                issue = state[key].find(issue => issue.id === id);
                if (issue) {
                    sourceListKey = key;
                    break;
                }
            }

            if (!issue || !sourceListKey) return;

            const sourceList = state[sourceListKey];

            const destinationListKey =
                newState === IssueState.TODO ? "openIssues" :
                    newState === IssueState.IN_PROGRESS ? "inProgressIssues" :
                        "closedIssues";

            if (sourceListKey === destinationListKey) {
                // change the position in same list
                const sourceIndex = sourceList.findIndex(i => i.id === id);
                if (sourceIndex === -1) return;

                const [movedIssue] = sourceList.splice(sourceIndex, 1);
                sourceList.splice(destinationIndex, 0, movedIssue);
            } else {
                // move to another list
                state[sourceListKey] = sourceList.filter(i => i.id !== id);

                issue.state = newState;

                state[destinationListKey].splice(destinationIndex, 0, issue);
            }
        },
        resetIssues: (state) => {
            state.openIssues = [];
            state.inProgressIssues = [];
            state.closedIssues = [];
        },
        resetErrors: (state) => {
            state.isError_OpenIssues = false;
            state.isError_InProgressIssues = false;
            state.isError_ClosedIssues = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // FULFILLED
            .addMatcher(
                issuesApi.endpoints.getOpenIssues.matchFulfilled,
                (state, action) => {
                    state.openIssues = [...action.payload];
                    state.isError_OpenIssues = false;
                    state.isLoading_OpenIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getInProgressIssues.matchFulfilled,
                (state, action) => {
                    state.inProgressIssues = [...action.payload];
                    state.isError_InProgressIssues = false;
                    state.isLoading_InProgressIssues = false;
                }
            )
            .addMatcher(
                issuesApi.endpoints.getClosedIssues.matchFulfilled,
                (state, action) => {
                    state.closedIssues = [...action.payload];
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

export const { setOpenIssues, setInProgressIssues, setClosedIssues, resetIssues, updateIssueState, resetErrors } = IssueSlice.actions;
export default IssueSlice.reducer;