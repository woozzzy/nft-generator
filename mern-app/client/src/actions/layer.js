import { FETCH_ALL, UPLOAD, UPDATE } from '../slices/layerSlice';
import * as api from '../api/index.js';

export const getLayers = () => async (dispatch) => {
    try {
        const { data } = await api.getLayers();
        // dispatch({ type: FETCH_ALL, payload: data });
        dispatch(FETCH_ALL(data));
    } catch (error) {
        console.log(error);
    }
};

export const uploadLayer = (files) => async (dispatch) => {
    try {
        const fileList = files.fileList;
        const data = new FormData()
        for (let i = 0; i < fileList.length; i++) {
            const newFile = new File([fileList[i]], `layers-${files.layerName}-${fileList[i].name}`, { type: fileList[i].type });
            data.append('layerUpload', newFile)
        }
        const res = await api.uploadLayer(data);
        dispatch(UPLOAD(res.data.layerCreated))
    } catch (error) {
        console.log(error);
    }
}

export const updateLayer = (id, layer) => async (dispatch) => {
    try {
        const { data } = await api.updateLayer(id, layer);
        dispatch(UPDATE(data))
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = (idsToUpdate) => async (dispatch) => {
    try {
        const { res } = await api.updateOrder(idsToUpdate);
        // dispatch(UPDATE(res))
    } catch (error) {
        console.log(error);
    }
}

