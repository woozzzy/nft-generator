import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        configList: [],
    },
    reducers: {
        FETCH_ALL: (state, action) => {
            state.configList = action.payload;
        },
        CREATE: (state, action) => {
            state.configList.push(action.payload);
        },
        UPDATE: (state, action) => {
            state.configList.map((post) => (post._id === action.payload._id ? action.payload : post));
        },
        DELETE: (state, action) => {
            state.configList.filter((post) => post._id !== action.payload);
        },
    }
});

export const { FETCH_ALL, CREATE, UPDATE, DELETE } = configSlice.actions

export default configSlice;