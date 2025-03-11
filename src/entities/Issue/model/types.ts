export enum IssueState {
    TODO = "ToDo",
    IN_PROGRESS = "In Progress",
    DONE = "Done"
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