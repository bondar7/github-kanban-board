import { createSelector } from 'reselect';
import { RootState } from "../../../shared";
import { Issue, IssueState } from "./types.ts";

export const selectAllIssues = (state: RootState): Issue[] => state.issueReducer.issues;

export const selectToDoIssues = createSelector(
    (state: RootState) => state.issueReducer.issues,
    (issues) => issues.filter(issue => issue.state === IssueState.TODO)
);

export const selectInProgressIssues = createSelector(
    (state: RootState) => state.issueReducer.issues,
    (issues) => issues.filter(issue => issue.state === IssueState.IN_PROGRESS)
);

export const selectDoneIssues = createSelector(
    (state: RootState) => state.issueReducer.issues,
    (issues) => issues.filter(issue => issue.state === IssueState.DONE)
);

export const selectOpenIssuesLoading = (state: RootState) => state.issueReducer.isLoading_OpenIssues;
export const selectInProgressIssuesLoading = (state: RootState) => state.issueReducer.isLoading_InProgressIssues;
export const selectClosedIssuesLoading = (state: RootState) => state.issueReducer.isLoading_ClosedIssues;

export const selectOpenIssuesError = (state: RootState) => state.issueReducer.isError_OpenIssues;
export const selectInProgressIssuesError = (state: RootState) => state.issueReducer.isError_InProgressIssues;
export const selectClosedIssuesError = (state: RootState) => state.issueReducer.isError_ClosedIssues;
