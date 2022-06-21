import { createSlice } from "@reduxjs/toolkit";

const artSlice = createSlice({
    name: 'art',
    initialState: {
        images: [],
    },
    reducers: {
        FETCH_ALL: (state, action) => {
            state.images = action.payload;
        },
    }
});

export const { FETCH_ALL } = artSlice.actions;

export default artSlice;