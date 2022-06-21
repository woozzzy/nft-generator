import { createSlice } from "@reduxjs/toolkit";

const artSlice = createSlice({
    name: 'art',
    initialState: {
        images: [],
    },
    reducers: {
        fetch_all: (state, action) => {
            state.images = [...action.payload];
        },
    }
});

export const { fetch_all } = artSlice.actions;

export default artSlice;