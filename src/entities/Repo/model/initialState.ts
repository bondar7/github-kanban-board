import {RepoState} from "./types";

export const repoInitialState: RepoState = {
    repo: null,
    repoFullName: "",
    isLoading: false,
    isError: false,
}