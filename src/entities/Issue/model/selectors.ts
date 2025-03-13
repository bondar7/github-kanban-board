import {RootState} from "../../../shared";

export const selectToDoIssues = (state: RootState) => state.issueReducer.openIssues;

export const selectInProgressIssues = (state: RootState) => state.issueReducer.inProgressIssues;

export const selectDoneIssues = (state: RootState) => state.issueReducer.closedIssues;

export const selectOpenIssuesLoading = (state: RootState) => state.issueReducer.isLoading_OpenIssues;
export const selectInProgressIssuesLoading = (state: RootState) => state.issueReducer.isLoading_InProgressIssues;
export const selectClosedIssuesLoading = (state: RootState) => state.issueReducer.isLoading_ClosedIssues;

export const selectOpenIssuesError = (state: RootState) => state.issueReducer.isError_OpenIssues;
export const selectInProgressIssuesError = (state: RootState) => state.issueReducer.isError_InProgressIssues;
export const selectClosedIssuesError = (state: RootState) => state.issueReducer.isError_ClosedIssues;
