// eslint-disable-next-line no-unused-vars
import { setUser, clear, setProjects } from "../slices/userSlice"
import * as api from '../api/index.js'

export const signup = (address) => async (dispatch) => {
    try {
        const { data } = await api.signup({ address })
        dispatch(setUser(data))
    } catch (error) {
        console.log(error)
    }
}

export const login = (address, signature) => async (dispatch) => {
    try {
        const { data } = await api.login({ address, signature })
        dispatch(setUser(data))
    } catch (error) {
        console.log(error)
    }
}

export const getUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.getUser(user)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}