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
        pushToProjects: (state, action) => {
            state.projects.push(action.payload)
        },
        clear: (state) => {
            state.user = null
            state.projects = null
        },
    }
});

export const { setUser, clear, setProjects, pushToProjects } = userSlice.actions;

export default userSlice;