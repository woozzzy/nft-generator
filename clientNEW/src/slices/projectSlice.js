import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        chain: '',
        nftName: '',
        nftDescription: '',
        startingEdition: 0,
        editionCount: 0,
        generateAll: false,
        height: 512,
        width: 512,
        layerList: [],
        debug: false,
    },
    reducers: {
        setProject: (state, action) => {
            state._id = action.payload._id
            state.chain = action.payload.chain
            state.nftName = action.payload.nftName
            state.nftDescription = action.payload.nftDescription
            state.startingEdition = action.payload.startingEdition
            state.editionCount = action.payload.editionCount
            state.generateAll = action.payload.generateAll
            state.height = action.payload.height
            state.width = action.payload.width
            state.layerList = action.payload.layerList
            state.debug = action.payload.debug
        },
        updateField: (state, action) => {
            const { field, data } = action.payload
            state[field] = data
        },
        clearProject: (state) => {
            delete state._id
            state.chain = ''
            state.nftName = ''
            state.nftDescription = ''
            state.startingEdition = 0
            state.editionCount = 0
            state.generateAll = false
            state.height = 512
            state.width = 512
            state.layerList = []
            state.debug = false
        },
        setLayerList: (state, action) => {
            state.layerList = action.payload;
        },
        pushToLayerList: (state, action) => {
            state.layerList.push(action.payload);
        },
        updateLayerList: (state, action) => {
            state.layerList.map((layer) => (layer._id === action.payload._id ? action.payload : layer));
        },
    }
});

export const { setProject, updateField, clearProject, setLayerList, pushToLayerList, updateLayerList } = projectSlice.actions

export default projectSlice;