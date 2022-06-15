import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getConfigs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchConfigs();
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createConfig = (config) => async (dispatch) => {
    try {
        const { data } = await api.createConfig(config);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateConfig = (id, config) => async (dispatch) => {
    try {
        const { data } = await api.updateConfig(id, config);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteConfig = (id) => async (dispatch) => {
    try {
        await api.deleteConfig(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};