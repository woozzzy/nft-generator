import { configureStore } from '@reduxjs/toolkit'

import userSlice from '../slices/userSlice'
import authSlice from '../slices/authSlice'
import pageSlice from '../slices/pageSlice'
import projectSlice from '../slices/projectSlice'

export const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        user: userSlice.reducer,
        auth: authSlice.reducer,
        project: projectSlice.reducer,
    },
})