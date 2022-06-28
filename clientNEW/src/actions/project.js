import * as api from '../api/index.js'
import { setProject } from '../slices/projectSlice'
import { setProjects } from '../slices/userSlice'

export const getProjects = (token) => async (dispatch) => {
    try {
        const { data } = await api.getProjects(token)
        dispatch(setProjects(data))
    } catch (error) {
        console.log(error)
    }
}

export const getProject = (id, token) => async (dispatch) => {
    try {
        const { data } = await api.getProject(id, token)
        console.log(data)
        dispatch(setProject(data))
    } catch (error) {
        console.log(error)
    }
}

export const createProject = (config) => async (dispatch) => {
    try {
        const { data } = await api.createProject(config)
        dispatch(setProject(data))
    } catch (error) {
        console.log(error)
    }
}

// export const updateProject = (id, config) => async (dispatch) => {
//     try {
//         const { data } = await api.updateConfig(id, config)
//         dispatch(UPDATE(data))
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const deleteConfig = (id) => async (dispatch) => {
//     try {
//         await api.deleteConfig(id)
//         dispatch(DELETE(id))
//     } catch (error) {
//         console.log(error)
//     }
// }