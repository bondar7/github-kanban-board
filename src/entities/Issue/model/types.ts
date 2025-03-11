export enum IssueState {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export interface Issue {
    id: number;
    title: string;
    number: number;
    createdAt: string;
    author: string;
    commentsCount: number;
    state: IssueState.DONE | IssueState.IN_PROGRESS | IssueState.TODO;
}

export type IssuesState = {
    issues: Issue[];
}