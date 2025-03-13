import {RepoState} from "./types.ts";

export const repoInitialState: RepoState = {
    repo: null,
    repoFullName: "",
    isLoading: false,
    isError: false,
}