import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Repo} from "../model/types";

export const repoApi = createApi({
    reducerPath: "repoApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com" }),
    endpoints: (builder) => ({
        getRepo: builder.query<Repo, string>({
            query: (repoFullName) => `/repos/${repoFullName}`,
        }),
    })
})