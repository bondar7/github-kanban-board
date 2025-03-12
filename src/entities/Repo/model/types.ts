export interface RepoOwner {
    login: string;
    id: number;
    url: string;
}

export interface Repo {
    name: string;
    url: string;
    owner: RepoOwner;
}

export type RepoState = {
    repo: Repo | null;
    isLoading: boolean;
    isError: boolean;
}