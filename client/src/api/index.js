import axios from 'axios'

// const host = window.location.host
const host = "localhost:5555"

const projectUrl = `http://${host}/api/project`
const layerUrl = `http://${host}/api/layer`
const artURL = `http://${host}/api/art`
const authURL = `http://${host}/api/user`

const authHeader = (token) => ({ headers: { 'Authorization': `Bearer ${token}` } })

export const signup = (body) => axios.post(`${authURL}/signup`, body)
export const login = (body) => axios.post(`${authURL}/login`, body)

export const getProjects = (token) => axios.get(`${projectUrl}/all`, authHeader(token))
export const getProject = (id, token) => axios.get(`${projectUrl}/${id}`, authHeader(token))
export const createProject = (newProject, token) => axios.post(projectUrl, newProject, authHeader(token))
export const updateProject = (id, updatedProject, token) => axios.patch(`${projectUrl}/${id}`, updatedProject, authHeader(token))
export const deleteProject = (id, token) => axios.delete(`${projectUrl}/${id}`, authHeader(token))

export const getLayers = (proj, token) => axios.get(`${layerUrl}/${proj}/all`, authHeader(token))
export const uploadLayer = (proj, layerName, files, token) => axios.post(`${layerUrl}/${proj}/${layerName}`, files, authHeader(token))
export const updateLayer = (proj, layer, updatedLayer, token) => axios.patch(`${layerUrl}/${proj}/${layer}`, updatedLayer, authHeader(token))
export const updateOrder = (proj, data, token) => axios.patch(`${layerUrl}/${proj}/order`, data, authHeader(token))

export const getArt = (proj, token) => axios.get(`${artURL}/${proj}`, authHeader(token))
export const downloadAll = (proj, token) => axios.get(`${artURL}/${proj}/download/all`, { ...authHeader(token), responseType: 'blob' })
export const generateArt = (proj, config, token) => axios.post(`${artURL}/${proj}`, config, authHeader(token))
export const uploadToIPFS = (proj, key, token) => axios.post(`${artURL}/${proj}/upload`, key, authHeader(token))

