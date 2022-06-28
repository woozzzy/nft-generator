import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name: 'project',
    initialState: {
        _id: '',
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
    }
});

export const { setProject } = projectSlice.actions

export default projectSlice;