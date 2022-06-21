import { createSlice } from "@reduxjs/toolkit";

const layerSlice = createSlice({
    name: 'layer',
    initialState: {
        layerList: [],
    },
    reducers: {
        FETCH_ALL: (state, action) => {
            state.layerList = action.payload;
        },
        UPLOAD: (state, action) => {
            state.layerList.push(action.payload);
        },
        UPDATE: (state, action) => {
            state.layerList.map((layer) => (layer._id === action.payload._id ? action.payload : layer));
        },
        setLayerList: (state, action) => {
            state.layerList = action.payload;
        },
    }
});

export const { UPLOAD, FETCH_ALL, UPDATE, setLayerList } = layerSlice.actions;

export default layerSlice;