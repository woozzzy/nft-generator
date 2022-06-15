import { UPLOAD } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const uploadLayer = (files) => async (dispatch) => {
    try {
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('something', files[i])
        }
        await api.uploadLayer(data);
        dispatch({ type: UPLOAD, payload: files });
    } catch (error) {
        console.log(error);
    }
}