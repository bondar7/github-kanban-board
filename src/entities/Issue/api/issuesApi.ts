import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Issue} from "../model/types.ts";

export const issuesApi = createApi({
    reducerPath: "issuesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
    endpoints: (builder) => ({
        getIssues: builder.query<Issue[], string>({
            query: (repoFullName) => `/repos/${repoFullName}/issues`,
        }),
    })
})