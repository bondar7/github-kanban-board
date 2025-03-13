export interface RepoOwner {
    login: string;
    url: string;
}

export interface Repo {
    name: string;
    html_url: string;
    owner: RepoOwner;
}

export type RepoState = {
    repo: Repo | null;
    repoFullName: string;
    isLoading: boolean;
    isError: boolean;
}