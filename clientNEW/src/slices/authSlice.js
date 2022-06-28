import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        pending: false,
        isAuth: false,
        authError: ""
    },
    reducers: {
        authPending: (state) => {
            state.pending = true
        },
        authSuccess: (state) => {
            state.pending = false
            state.isAuth = true
            state.authError = ""
        },
        authFail: (state, action) => {
            state.pending = false
            state.isAuth = false
            state.authError = action.payload
        }
    }
});

export const { authPending, authSuccess, authFail } = authSlice.actions;

export default authSlice;