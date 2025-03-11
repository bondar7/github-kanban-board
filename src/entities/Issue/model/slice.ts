import {createSlice} from "@reduxjs/toolkit";
import {IssuesInitialState as initialState} from "./initialState.ts";

const IssueSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {},
});

export default IssueSlice.reducer;