import React from 'react'
import { useConnectedMetaMask, useMetaMask } from "metamask-react"
import { useSnackbar } from 'notistack'
import { Typography } from '@mui/material'

import { MetaBtn } from '../../../styles'
import { networks, networkParams } from '../../../../constants/networks'

const NetworkSwitch = ({ chainId }) => {
    const { switchChain } = useConnectedMetaMask()
    const { addChain } = useMetaMask();
    const { enqueueSnackbar } = useSnackbar()

    const handleSwitch = async () => {
        try {
            await switchChain(chainId)
            enqueueSnackbar(`Successfully switched to ${networks[chainId]}`, { variant: 'success', autoHideDuration: 2000 });
        } catch (error) {
            try {
                enqueueSnackbar('Please add selected chain to Metamask', { variant: 'warning', autoHideDuration: 2000 });
                await addChain(networkParams[chainId])
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error', autoHideDuration: 2000 });
            }
        }
    }

    return (
        <MetaBtn variant="contained">
            <Typography fontFamily='Helvetica' color='white' onClick={handleSwitch}>
                {networks[chainId]}
            </Typography>
        </MetaBtn>
    )
}

export default NetworkSwitch