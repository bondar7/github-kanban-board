import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Issue, IssueState } from "../model/types";

export const issuesApi = createApi({
    reducerPath: "issuesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
    endpoints: (builder) => ({
        getOpenIssues: builder.query<Issue[], string>({
            query: (repoFullName) => ({
                url: `/repos/${repoFullName}/issues`,
                params: {
                    per_page: 100,
                    page: 1,
                    state: "open",
                },
            }),
            transformResponse: (response: Issue[]): Issue[] => {
                return response
                    .map((issue: Issue) => ({
                        ...issue,
                        state: getState(issue),
                    }))
                    .filter((issue: Issue) => !issue.assignee);
            },
        }),
        getInProgressIssues: builder.query<Issue[], string>({
            query: (repoFullName) => ({
                url: `/repos/${repoFullName}/issues`,
                params: {
                    per_page: 100,
                    page: 1,
                    state: "open"
                },
            }),
            transformResponse: (response: Issue[]): Issue[] => {
                return response
                    .map((issue: Issue) => ({
                        ...issue,
                        state: getState(issue),
                    }))
                    .filter((issue: Issue) => issue.state === IssueState.IN_PROGRESS);
            },
        }),
        getClosedIssues: builder.query<Issue[], string>({
            query: (repoFullName) => ({
                url: `/repos/${repoFullName}/issues`,
                params: {
                    per_page: 100,
                    page: 1,
                    state: "closed",
                },
            }),
            transformResponse: (response: Issue[]): Issue[] => {
                return response
                    .map((issue: Issue) => ({
                        ...issue,
                        state: getState(issue),
                    }));
            },
        }),
    }),
});

const getState = (issue: Issue): IssueState => {
    if (issue.state === "closed") {
        return IssueState.DONE;
    }

    if (issue.assignee) {
        return IssueState.IN_PROGRESS;
    }

    return IssueState.TODO;
};
