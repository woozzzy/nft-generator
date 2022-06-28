import * as api from '../api/index.js';
import { setLayerList, pushToLayerList, updateLayerList } from '../slices/projectSlice';

export const getLayers = () => async (dispatch) => {
    try {
        const { data } = await api.getLayers();
        dispatch(setLayerList(data));
    } catch (error) {
        console.log(error);
    }
};

export const uploadLayer = (files) => async (dispatch) => {
    try {
        const fileList = files.fileList;
        const data = new FormData()
        for (let i = 0; i < fileList.length; i++) {
            let newFile = new File([fileList[i]], fileList[i].name, { type: fileList[i].type, });
            data.append('layerUpload', newFile)
        }
        const res = await api.uploadLayer(files.layerName, data);
        dispatch(pushToLayerList(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const updateLayer = (id, layer) => async (dispatch) => {
    try {
        await api.updateLayer(id, layer);
        dispatch(updateLayerList(layer));
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = (newOrder) => async (dispatch) => {
    try {
        dispatch(setLayerList(newOrder));
        await api.updateOrder(newOrder);
    } catch (error) {
        console.log(error);
    }
}

