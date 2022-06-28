import React, { useEffect } from 'react'
import { useConnectedMetaMask } from "metamask-react"
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { ethers } from "ethers";
import { CircularProgress, Typography } from '@mui/material';

import { MetaBtn } from '../../styles';
import { signup, login } from '../../../actions/user'
import { authPending, authSuccess, authFail } from '../../../slices/authSlice';

const DbAuth = () => {
    const { account } = useConnectedMetaMask()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const { pending } = useSelector((state) => state.auth)


    useEffect(() => {
        if (!user) dispatch(signup(account))
    }, [])

    const attemptLogin = async () => {
        dispatch(authPending())
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        try {
            enqueueSnackbar("Please sign message to authenticate.", { variant: 'warning', autoHideDuration: 2000 })
            const signature = await signer.signMessage(`Nonce: ${user.nonce}`)
            dispatch(login(user.address, signature))
            // enqueueSnackbar("Sign in successful!", { variant: 'success', autoHideDuration: 2000 })
            dispatch(authSuccess())
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 })
            dispatch(authFail(error.message))
        }
    }

    return (pending
        ? <CircularProgress size='8em' color='primary' />
        : <MetaBtn sx={{ margin: '1.5em auto' }} onClick={attemptLogin}>
            <Typography fontFamily='Helvetica' color='white'>
                Login with Metamask
            </Typography>
        </MetaBtn>
    )
}

export default DbAuth