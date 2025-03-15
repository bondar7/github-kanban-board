import {store} from "./store";
import {issuesApi} from "../../entities/Issue";
import {repoApi} from "../../entities/Repo";

describe('Redux Store', () => {
    it('should initialize with correct reducers', () => {
        const state = store.getState();

        expect(state).toHaveProperty(issuesApi.reducerPath);
        expect(state).toHaveProperty(repoApi.reducerPath);
        expect(state).toHaveProperty('issueReducer');
        expect(state).toHaveProperty('repoReducer');
    });
});
