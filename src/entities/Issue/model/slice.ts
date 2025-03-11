import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IssuesInitialState as initialState} from "./initialState.ts";
import {Issue} from "./types.ts";

const IssueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {
        setIssues: (state, action: PayloadAction<Issue[]>) => {
            state.issues = action.payload;
        }
    },
});

export default IssueSlice.reducer;