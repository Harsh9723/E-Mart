import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [], // Initialize users array
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // get all users 
        getusersStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getusersSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.users = action.payload; // Set users data received from action.payload
        },
        getusersFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, getusersStart, getusersSuccess, getusersFailure } = userSlice.actions;
export default userSlice.reducer;
