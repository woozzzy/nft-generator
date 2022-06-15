import axios from 'axios';

const configUrl = 'http://localhost:5555/config';
const layerUrl = 'http://localhost:5555/layer';

export const fetchConfigs = () => axios.get(configUrl);
export const createConfig = (newConfig) => axios.post(configUrl, newConfig);
export const updateConfig = (id, updatedConfig) => axios.patch(`${configUrl}/${id}`, updatedConfig);
export const deleteConfig = (id) => axios.delete(`${configUrl}/${id}`);
export const uploadLayer = (files) => axios.post(layerUrl, files);