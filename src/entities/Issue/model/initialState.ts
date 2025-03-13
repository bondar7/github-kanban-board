import {IssuesState} from "./types.ts";

export const IssuesInitialState: IssuesState = {
    openIssues: [],
    inProgressIssues: [],
    closedIssues: [],
    isLoading_OpenIssues: false,
    isLoading_InProgressIssues: false,
    isLoading_ClosedIssues : false,
    isError_OpenIssues: false,
    isError_InProgressIssues: false,
    isError_ClosedIssues: false,
}