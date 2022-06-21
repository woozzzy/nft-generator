import { createSlice } from "@reduxjs/toolkit";

const layerSlice = createSlice({
    name: 'layer',
    initialState: {
        layerList: [],
    },
    reducers: {
        fetch_all: (state, action) => {
            state.layerList = action.payload;
        },
        upload: (state, action) => {
            state.layerList.push(action.payload);
        },
        update: (state, action) => {
            state.layerList.map((layer) => (layer._id === action.payload._id ? action.payload : layer));
        },
        setLayerList: (state, action) => {
            state.layerList = action.payload;
        },
    }
});

export const { upload, fetch_all, update, setLayerList } = layerSlice.actions;

export default layerSlice;