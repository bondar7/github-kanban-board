import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Issue} from "../../entities/Issue";

export const githubApi = createApi({
    reducerPath: "githubApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
    endpoints: (builder) => ({
        getIssues: builder.query<Issue[], string>({
            query: (repoFullName) => `/repos/${repoFullName}/issues`,
        }),
    })
})