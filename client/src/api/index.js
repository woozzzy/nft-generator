import axios from 'axios';

const host = window.location.host;
console.log(host);

const configUrl = `http://${host}/api/config`;
const layerUrl = `http://${host}/api/layer`;
const artURL = `http://${host}/api/art`;

export const fetchConfigs = () => axios.get(configUrl);
export const createConfig = (newConfig) => axios.post(configUrl, newConfig);
export const updateConfig = (id, updatedConfig) => axios.patch(`${configUrl}/${id}`, updatedConfig);
export const deleteConfig = (id) => axios.delete(`${configUrl}/${id}`);
export const getLayers = () => axios.get(layerUrl);

export const uploadLayer = (layer, files) => axios.post(`${layerUrl}/${layer}`, files);
export const updateLayer = (id, updatedLayer) => axios.patch(`${layerUrl}/update/${id}`, updatedLayer);
export const updateOrder = (data) => axios.patch(`${layerUrl}/order`, data);

export const getArt = () => axios.get(artURL);
export const downloadAll = () => axios.get(`${artURL}/download/all`, { responseType: 'blob' });
export const generateArt = (config) => axios.post(artURL, config);

