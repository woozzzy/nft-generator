import React from 'react'
import { AnimatePresence, } from "framer-motion/dist/framer-motion"
import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { Box } from '@mui/material'

import TransitionWrapper from './TransitionWrapper'
import Home from '../Home'
import Auth from '../Auth/Auth'
import UserProjects from '../UserProjects/UserProjects'
import ProjectConfig from '../ProjectConfig/ProjectConfig'

const AnimatedRoutes = ({ currPage }) => {
    const location = useLocation()

    const ProtectedRoute = (({ path, children }) => {
        if (currPage !== path) {
            return <Navigate to={currPage} replace />
        }

        return children
    })

    return (
        <Box display="flex" justifyContent='center' width='100%' height='100%'>
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname} >
                    <Route path="/" element={
                        <TransitionWrapper element={<Home />} />
                    } />
                    <Route path="/auth" element={
                        <ProtectedRoute path="/auth">
                            <TransitionWrapper element={<Auth />} />
                        </ProtectedRoute>
                    } />
                    <Route path="/user" element={
                        <ProtectedRoute path="/user">
                            <TransitionWrapper element={<UserProjects />} />
                        </ProtectedRoute>
                    } />
                    <Route path="/config" element={
                        <ProtectedRoute path="/config">
                            <TransitionWrapper element={<ProjectConfig />} />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={
                        <TransitionWrapper element={<Home />} />
                    } />
                </Routes>
            </AnimatePresence>
        </Box>
    )
}

export default AnimatedRoutes