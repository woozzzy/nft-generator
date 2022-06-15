import { createSlice } from "@reduxjs/toolkit";

const layerSlice = createSlice({
    name: 'layer',
    initialState: {
        layerList: [],
    },
    reducers: {
        UPLOAD: (state, action) => {
            state.configList.push(action.payload);
        },
    }
});

export default layerSlice;