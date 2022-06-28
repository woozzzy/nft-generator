import axios from 'axios'

// const host = window.location.host
const host = "localhost:5555"

const projectUrl = `http://${host}/api/project`
const layerUrl = `http://${host}/api/layer`
const artURL = `http://${host}/api/art`
const authURL = `http://${host}/api/user`

export const getProjects = (token) => axios.get(`${projectUrl}/all`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export const getProject = (id, token) => axios.get(`${projectUrl}/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export const createProject = (newProject, token) => axios.post(projectUrl, newProject, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export const updateProject = (id, updatedProject, token) => axios.patch(`${projectUrl}/${id}`, updatedProject, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
export const deleteProject = (id, token) => axios.delete(`${projectUrl}/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
// ---------
export const getLayers = () => axios.get(layerUrl)
export const uploadLayer = (layer, files) => axios.post(`${layerUrl}/${layer}`, files)
export const updateLayer = (id, updatedLayer) => axios.patch(`${layerUrl}/update/${id}`, updatedLayer)
export const updateOrder = (data) => axios.patch(`${layerUrl}/order`, data)

export const getArt = () => axios.get(artURL)
export const downloadAll = () => axios.get(`${artURL}/download/all`, { responseType: 'blob' })
export const generateArt = (config) => axios.post(artURL, config)

export const signup = (body) => axios.post(`${authURL}/signup`, body)
export const login = (body) => axios.post(`${authURL}/login`, body)
export const getUser = (user) => axios.get(`${authURL}/get`, {
    headers: {
        'Authorization': `Bearer ${user.token}`
    }
})
