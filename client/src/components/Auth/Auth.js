import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useMetaMask } from "metamask-react"
import { Typography, CircularProgress, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'


import DbAuth from './DbAuth/DbAuth'
import { MetaBtn } from '../styles'
import { setCanContinue } from '../../slices/pageSlice'

const Auth = () => {
    const { status, connect } = useMetaMask()
    const { enqueueSnackbar } = useSnackbar()
    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCanContinue(isAuth))
    }, [isAuth])

    const connectMetamask = async () => {
        if (status === "unavailable") {
            window.open('https://metamask.io/download/', '_blank');
        } else {
            try {
                enqueueSnackbar('Please connect to Metamask', { variant: 'warning', autoHideDuration: 2000 });
                connect()
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
            }
        }
    }

    switch (status) {
        case "initalizing":
        case "connecting":
        case "unavailble":
        default:
            return <CircularProgress size='8em' color='primary' />
        case "notConnected":
            return (
                <MetaBtn variant="contained" onClick={connectMetamask}>
                    <Typography fontFamily='Helvetica' color='white'>
                        Connect Metamask
                    </Typography>
                </MetaBtn>
            )
        case "connected":
            return isAuth
                ? <Alert variant='filled' severity='success' sx={{ borderRadius: '0.5em' }}> Sign in Successful! </Alert>
                : <DbAuth />
    }


}

export default Auth