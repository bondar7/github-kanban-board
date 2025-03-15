import { configureStore } from '@reduxjs/toolkit';
import issueReducer, {
    resetErrors,
    resetIssues,
    setClosedIssues,
    setInProgressIssues,
    setOpenIssues,
    updateIssueState,
} from './slice';
import { issuesApi } from '../../api/issuesApi';
import { Issue, IssueState } from "../types";
import {RootState} from "../../../../shared";

describe('issueSlice', () => {
    let store: ReturnType<typeof configureStore>;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                issueReducer,
                [issuesApi.reducerPath]: issuesApi.reducer,  // RTK Query reducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(issuesApi.middleware),
        });
    });

    it('should set open issues', () => {
        const issues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.TODO },
            { id: 2, title: 'Issue 2', number: 2, created_at: '2021-02-01', user: { login: 'user2' }, assignee: null, comments: 2, state: IssueState.TODO },
        ];
        store.dispatch(setOpenIssues(issues));

        // Cast the state to RootState to make sure TypeScript knows its shape
        const state = store.getState() as RootState;
        expect(state.issueReducer.openIssues).toEqual(issues); // Accessing issue slice
    });

    it('should set in-progress issues', () => {
        const issues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.IN_PROGRESS },
            { id: 2, title: 'Issue 2', number: 2, created_at: '2021-02-01', user: { login: 'user2' }, assignee: null, comments: 2, state: IssueState.IN_PROGRESS },
        ];
        store.dispatch(setInProgressIssues(issues));

        const state = store.getState() as RootState;
        expect(state.issueReducer.inProgressIssues).toEqual(issues);
    });

    it('should set closed issues', () => {
        const issues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.DONE },
            { id: 2, title: 'Issue 2', number: 2, created_at: '2021-02-01', user: { login: 'user2' }, assignee: null, comments: 2, state: IssueState.DONE },
        ];
        store.dispatch(setClosedIssues(issues));

        const state = store.getState() as RootState;
        expect(state.issueReducer.closedIssues).toEqual(issues);
    });

    it('should update issue state', () => {
        const initialIssues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.TODO },
            { id: 2, title: 'Issue 2', number: 2, created_at: '2021-02-01', user: { login: 'user2' }, assignee: null, comments: 2, state: IssueState.TODO },
        ];
        store.dispatch(setOpenIssues(initialIssues));

        store.dispatch(updateIssueState({ id: 1, newState: IssueState.IN_PROGRESS, destinationIndex: 0 }));

        const state = store.getState() as RootState;

        // Ensure issue is removed from openIssues
        expect(state.issueReducer.openIssues.find(issue => issue.id === 1)).toBeUndefined();

        // Ensure issue is added to inProgressIssues
        expect(state.issueReducer.inProgressIssues[0].id).toBe(1);
        expect(state.issueReducer.inProgressIssues[0].state).toBe(IssueState.IN_PROGRESS);
    });

    it('should reset issues', () => {
        const issues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.TODO },
        ];
        store.dispatch(setOpenIssues(issues));
        store.dispatch(resetIssues());
        const state = store.getState() as RootState;
        expect(state.issueReducer.openIssues).toEqual([]);
    });

    it('should reset errors', () => {
        const issues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.TODO },
        ];
        store.dispatch(setOpenIssues(issues));
        store.dispatch(resetErrors());
        const state = store.getState() as RootState;
        expect(state.issueReducer.isError_OpenIssues).toBe(false);
    });

    it('should not update issue state if issue does not exist', () => {
        store.dispatch(updateIssueState({ id: 99, newState: IssueState.IN_PROGRESS, destinationIndex: 0 }));

        const state = store.getState() as RootState;
        expect(state.issueReducer.openIssues.length).toBe(0);
        expect(state.issueReducer.inProgressIssues.length).toBe(0);
        expect(state.issueReducer.closedIssues.length).toBe(0);
    });

    it('should reorder an issue within the same state list', () => {
        const initialIssues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.IN_PROGRESS },
            { id: 2, title: 'Issue 2', number: 2, created_at: '2021-02-01', user: { login: 'user2' }, assignee: null, comments: 2, state: IssueState.IN_PROGRESS },
        ];
        store.dispatch(setInProgressIssues(initialIssues));

        // Move Issue 2 to index 0
        store.dispatch(updateIssueState({ id: 2, newState: IssueState.IN_PROGRESS, destinationIndex: 0 }));

        const state = store.getState() as RootState;
        expect(state.issueReducer.inProgressIssues[0].id).toBe(2);
        expect(state.issueReducer.inProgressIssues[1].id).toBe(1);
    });

    it('should move an issue from in-progress to closed', () => {
        const initialIssues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.IN_PROGRESS },
        ];
        store.dispatch(setInProgressIssues(initialIssues));

        store.dispatch(updateIssueState({ id: 1, newState: IssueState.DONE, destinationIndex: 0 }));

        const state = store.getState() as RootState;

        expect(state.issueReducer.inProgressIssues.find(issue => issue.id === 1)).toBeUndefined();
        expect(state.issueReducer.closedIssues[0].id).toBe(1);
        expect(state.issueReducer.closedIssues[0].state).toBe(IssueState.DONE);
    });

    it('should move an issue from closed back to open', () => {
        const initialIssues: Issue[] = [
            { id: 1, title: 'Issue 1', number: 1, created_at: '2021-01-01', user: { login: 'user1' }, assignee: null, comments: 1, state: IssueState.DONE },
        ];
        store.dispatch(setClosedIssues(initialIssues));

        store.dispatch(updateIssueState({ id: 1, newState: IssueState.TODO, destinationIndex: 0 }));

        const state = store.getState() as RootState;

        expect(state.issueReducer.closedIssues.find(issue => issue.id === 1)).toBeUndefined();
        expect(state.issueReducer.openIssues[0].id).toBe(1);
        expect(state.issueReducer.openIssues[0].state).toBe(IssueState.TODO);
    });


});
