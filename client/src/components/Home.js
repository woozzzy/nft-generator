import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { setCanContinue } from '../slices/pageSlice'

const Home = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCanContinue(true))
    }, [])

    return (
        <>
            <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
                <Typography variant='h6' fontFamily='Helvetica' fontWeight='bold' color="primary" margin='0 0.5em'>
                    This is Home
                </Typography>
            </Box>
        </>
    )
}

export default Home