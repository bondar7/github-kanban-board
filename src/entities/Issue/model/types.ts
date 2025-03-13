export enum IssueState {
    TODO = "open",
    IN_PROGRESS = "in_progress",
    DONE = "closed"
}

export interface Issue {
    id: number;
    title: string;
    number: number;
    created_at: string;
    user: {
        login: string;
    };
    assignee: {
        login: string;
    } | null;
    comments: number;
    state: IssueState;
}

export type IssuesState = {
    openIssues: Issue[];
    inProgressIssues: Issue[];
    closedIssues: Issue[];
    isLoading_OpenIssues: boolean;
    isLoading_InProgressIssues: boolean;
    isLoading_ClosedIssues: boolean;
    isError_OpenIssues: boolean;
    isError_InProgressIssues: boolean;
    isError_ClosedIssues: boolean;
}