import * as api from '../api/index.js'
import { setProject } from '../slices/projectSlice'
import { pushToProjects, setProjects } from '../slices/userSlice'

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
        dispatch(setProject(data))
    } catch (error) {
        console.log(error)
    }
}

export const createProject = (project, token) => async (dispatch) => {
    try {
        const { data } = await api.createProject(project, token)
        dispatch(setProject(data))
        dispatch(pushToProjects(data))
    } catch (error) {
        console.log(error)
    }
}

export const updateProject = (id, update, token) => async (dispatch) => {
    try {
        await api.updateProject(id, update, token)
        dispatch(setProject(update))
    } catch (error) {
        console.log(error)
    }
}