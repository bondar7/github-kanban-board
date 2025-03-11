import {RootState} from "../../../shared";

export const selectCurrentRepo = (state: RootState) => state.repoReducer.repo;
export const selectRepoOwner = (state: RootState) => state.repoReducer.repo?.owner;