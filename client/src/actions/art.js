import * as api from '../api/index.js';
import { updateField } from '../slices/projectSlice';

export const getArt = (proj, token) => async (dispatch) => {
    try {
        const { data } = await api.getArt(proj, token)
        dispatch(updateField({ field: 'images', data: data.images }))
        dispatch(updateField({ field: 'metadata', data: data.json }))
    } catch (error) {
        console.log(error);
    }
};

export const downloadAll = (proj, token) => async (dispatch) => {
    try {
        const res = await api.downloadAll(proj._id, token);
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${proj.nftName}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.log(error);
    }
}

export const generateArt = (project, token) => async (dispatch) => {
    try {
        dispatch(updateField({ field: 'images', data: [] }))
        dispatch(updateField({ field: 'metadata', data: [] }))
        const { data } = await api.generateArt(project._id, project, token);
        console.log(data);
        dispatch(updateField({ field: 'images', data: data.images }))
        dispatch(updateField({ field: 'metadata', data: data.json }))
    } catch (error) {
        console.log(error);
    }
};