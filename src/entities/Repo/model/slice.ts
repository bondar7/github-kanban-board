import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {repoInitialState as initialState} from "./initialState.ts";
import {Repo} from "./types.ts";

const repoSlice = createSlice({
    name: "repo",
    initialState,
    reducers: {
        setRepo: (state, action: PayloadAction<Repo>) => {
            state.repo = action.payload;
        }
    },
});

export default repoSlice.reducer;