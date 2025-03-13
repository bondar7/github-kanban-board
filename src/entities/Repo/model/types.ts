export interface RepoOwner {
    login: string;
    html_url: string;
}

export interface Repo {
    name: string;
    html_url: string;
    owner: RepoOwner;
    stargazers_count: number;
}

export type RepoState = {
    repo: Repo | null;
    repoFullName: string;
    isLoading: boolean;
    isError: boolean;
}