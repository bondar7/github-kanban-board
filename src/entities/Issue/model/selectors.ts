import {RootState} from "../../../shared";
import {Issue, IssueState} from "./types.ts";

export const selectAllIssues = (state: RootState): Issue[] => state.issueReducer.issues;
export const selectToDoIssues = (state: RootState): Issue[] =>
    state.issueReducer.issues.filter(issue => issue.state === IssueState.TODO);
export const selectInProgressIssues = (state: RootState): Issue[] =>
    state.issueReducer.issues.filter(issue => issue.state === IssueState.IN_PROGRESS);
export const selectDoneIssues = (state: RootState): Issue[] =>
    state.issueReducer.issues.filter(issue => issue.state === IssueState.DONE);
export const selectLoadingState = (state: RootState): boolean => state.issueReducer.isLoading;
export const selectErrorState = (state: RootState): boolean => state.issueReducer.isError;