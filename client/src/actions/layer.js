import * as api from '../api/index.js';
import { setLayerList, pushToLayerList, updateLayerList } from '../slices/projectSlice';

export const getLayers = (proj, token) => async (dispatch) => {
    try {
        const { data } = await api.getLayers(proj, token);
        dispatch(setLayerList(data));
    } catch (error) {
        console.log(error);
    }
};

export const uploadLayer = (proj, files, token) => async (dispatch) => {
    try {
        const fileList = files.fileList;
        const data = new FormData()
        for (let i = 0; i < fileList.length; i++) {
            let newFile = new File([fileList[i]], fileList[i].name, { type: fileList[i].type, });
            data.append('layerUpload', newFile)
        }
        const res = await api.uploadLayer(proj, files.layerName, data, token);
        dispatch(pushToLayerList(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const updateLayer = (proj, id, layer, token) => async (dispatch) => {
    try {
        await api.updateLayer(proj, id, layer, token);
        dispatch(updateLayerList(layer));
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = (proj, newOrder, token) => async (dispatch) => {
    try {
        dispatch(setLayerList(newOrder));
        await api.updateOrder(proj, newOrder, token);
    } catch (error) {
        console.log(error);
    }
}

