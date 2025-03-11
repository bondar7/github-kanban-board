import {createSlice} from "@reduxjs/toolkit";
import {IssuesInitialState} from "./initialState.ts";

const IssueSlice = createSlice({
    name: "issue",
    initialState: IssuesInitialState,
    reducers: {},
});

export default IssueSlice.reducer;