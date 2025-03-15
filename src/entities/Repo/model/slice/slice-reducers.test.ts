import {Repo} from "../types";
import {setRepo, setRepoFullName} from "./slice";
import {repoReducer} from "../../index";

describe('repoSliceReducers', () => {
    const initialState = {
        repo: null,
        repoFullName: '',
        isLoading: false,
        isError: false,
    };

    const testRepo: Repo = {
        name: 'repo-name',
        html_url: 'https://github.com/username/repo-name',
        owner: { login: 'username', html_url: 'https://github.com/username' },
        stargazers_count: 5,
    };

    const testRepoFullName = 'username/repo-name';

    it('should handle setRepo correctly', () => {
        const action = setRepo(testRepo);
        const newState = repoReducer(initialState, action);
        expect(newState.repo).toEqual(testRepo);
    });

    it('should handle setRepoFullName correctly', () => {
        const action = setRepoFullName(testRepoFullName);
        const newState = repoReducer(initialState, action);
        expect(newState.repoFullName).toBe(testRepoFullName);
    });

    it('should handle setRepoFullName with an empty string', () => {
        const action = setRepoFullName('');
        const newState = repoReducer(initialState, action);
        expect(newState.repoFullName).toBe('');
    });
});
