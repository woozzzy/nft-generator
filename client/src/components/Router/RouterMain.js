import React from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import { Grid, Typography, Box } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'

import { NavBtn } from "../styles"
import AnimatedRoutes from "./AnimatedRoutes"
import { nextPage, prevPage } from '../../slices/pageSlice'

const RouterMain = () => {
    // eslint-disable-next-line no-unused-vars
    const { curr, next, prev, canContinue } = useSelector((state) => state.page)
    const dispatch = useDispatch()

    const handleNext = () => {
        dispatch(nextPage())
    }
    const handlePrev = () => {
        dispatch(prevPage())
    }

    return (
        <Router>
            <Grid item height='70%' xs={12}>
                <AnimatedRoutes currPage={curr} />
            </Grid>
            <Grid item xs={6} display='flex' justifyContent="center">
                <Box visibility={prev ? 'visible' : 'hidden'}>
                    <NavBtn component={Link} to={prev ? prev : curr} onClick={handlePrev} variant="contained">
                        <Typography fontFamily='Helvetica' fontWeight='Bold' color='white'>
                            Prev
                        </Typography>
                    </NavBtn>
                </Box>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent="center">
                <Box visibility={canContinue && next ? 'visible' : 'hidden'}>
                    <NavBtn component={Link} to={canContinue && next ? next : curr} onClick={handleNext} variant="contained">
                        <Typography fontFamily='Helvetica' fontWeight='Bold' color='white'>
                            Next
                        </Typography>
                    </NavBtn>
                </Box>
            </Grid>
        </Router>
    )
}

export default RouterMain