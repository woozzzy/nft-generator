import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        projects: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setProjects: (state, action) => {
            state.projects = action.payload
        },
        clear: (state) => {
            state.user = null
            state.projects = null
        },
    }
});

export const { setUser, clear, setProjects } = userSlice.actions;

export default userSlice;