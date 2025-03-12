import {RootState} from "../../../shared";

export const selectCurrentRepo = (state: RootState) => state.repoReducer.repo;
export const selectRepoOwner = (state: RootState) => state.repoReducer.repo?.owner;
export const selectLoadingState = (state: RootState): boolean => state.repoReducer.isLoading;
export const selectErrorState = (state: RootState): boolean => state.repoReducer.isError;