import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../slices/configSlice';

import * as api from '../api/index.js';

export const getConfigs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchConfigs();
        dispatch(FETCH_ALL(data));
    } catch (error) {
        console.log(error);
    }
};

export const createConfig = (config) => async (dispatch) => {
    try {
        const { data } = await api.createConfig(config);
        dispatch(CREATE(data));
    } catch (error) {
        console.log(error);
    }
};

export const updateConfig = (id, config) => async (dispatch) => {
    try {
        const { data } = await api.updateConfig(id, config);
        dispatch(UPDATE(data))
    } catch (error) {
        console.log(error);
    }
};

export const deleteConfig = (id) => async (dispatch) => {
    try {
        await api.deleteConfig(id);
        dispatch(DELETE(id))
    } catch (error) {
        console.log(error);
    }
};