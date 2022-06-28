import React from 'react'
import { AnimatePresence, } from "framer-motion/dist/framer-motion"
import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { Box } from '@mui/material'

import TransitionWrapper from './TransitionWrapper'
import Home from '../Home'
import Auth from '../Auth/Auth'
import UserProjects from '../UserProjects/UserProjects'
import ProjectConfig from '../ProjectConfig/ProjectConfig'
import LayerConfig from '../LayerConfig/LayerConfig'
import Art from '../Art/Art'
import Minter from '../Minter/Minter'
import ChainInfo from '../ChainInfo/ChainInfo'

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
                    <Route path="/layer" element={
                        <ProtectedRoute path="/layer">
                            <TransitionWrapper element={<LayerConfig />} />
                        </ProtectedRoute>
                    } />
                    <Route path="/art" element={
                        <ProtectedRoute path="/art">
                            <TransitionWrapper element={<Art />} />
                        </ProtectedRoute>
                    } />
                    <Route path="/chain" element={
                        <ProtectedRoute path="/chain">
                            <TransitionWrapper element={<ChainInfo />} />
                        </ProtectedRoute>
                    } />
                    <Route path="/mint" element={
                        <ProtectedRoute path="/mint">
                            <TransitionWrapper element={<Minter />} />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={
                        <Navigate to={'/'} replace />
                    } />
                </Routes>
            </AnimatePresence>
        </Box>
    )
}

export default AnimatedRoutes