import {RootState} from "../../../shared";

export const selectCurrentRepo = (state: RootState) => state.repoReducer.repo;
export const selectRepoOwner = (state: RootState) => state.repoReducer.repo?.owner;
export const selectRepoFullName = (state: RootState) => state.repoReducer.repoFullName;
export const selectIsRepoLoading = (state: RootState): boolean => state.repoReducer.isLoading;
export const selectIsRepoError = (state: RootState): boolean => state.repoReducer.isError;