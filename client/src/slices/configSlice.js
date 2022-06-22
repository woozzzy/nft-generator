import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
    name: 'config',
    initialState: {
        configList: [],
        currentConfig: {
            nftName: '',
            nftDescription: '',
            startingEdition: 0,
            editionCount: 0,
            generateAll: false,
            height: 512,
            width: 512,
            layerOrder: [],
            debug: false,
        },
    },
    reducers: {
        FETCH_ALL: (state, action) => {
            state.configList = action.payload;
            state.currentConfig = state.configList[0];
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
        setCurrentConfig: (state, action) => {
            state.currentConfig = action.payload;
        }
    }
});

export const { FETCH_ALL, CREATE, UPDATE, DELETE, setCurrentConfig } = configSlice.actions

export default configSlice;