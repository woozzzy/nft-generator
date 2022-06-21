import { FETCH_ALL } from '../slices/artSlice';
import * as api from '../api/index.js';

export const getArt = () => async (dispatch) => {
    try {
        const { data } = await api.getArt();
        dispatch(FETCH_ALL(data.images));
    } catch (error) {
        console.log(error);
    }
};

export const generateArt = (config) => async (dispatch) => {
    try {
        const { data } = await api.generateArt(config);
        console.log(data);
        dispatch(FETCH_ALL(data.images));
    } catch (error) {
        console.log(error);
    }
};