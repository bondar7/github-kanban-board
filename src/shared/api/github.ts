import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
    endpoints: (builder) => ({
        getIssues: builder.query({
            query: (repoFullName) => `/repos/${repoFullName}/issues`,
        }),
    })
})