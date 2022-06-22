import { fetch_all } from '../slices/artSlice';
import * as api from '../api/index.js';
import download from 'downloadjs';

export const getArt = () => async (dispatch) => {
    try {
        const { data } = await api.getArt();
        dispatch(fetch_all(data.images));
    } catch (error) {
        console.log(error);
    }
};

export const downloadAll = () => async (dispatch) => {
    try {
        const res = await api.downloadAll();
        const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers["content-type"] }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'test.zip');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.log(error);
    }
}

export const generateArt = (config) => async (dispatch) => {
    try {
        const { data } = await api.generateArt(config);
        console.log(data);
        dispatch(fetch_all(data.images));
    } catch (error) {
        console.log(error);
    }
};