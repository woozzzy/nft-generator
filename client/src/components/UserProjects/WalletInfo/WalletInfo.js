import React from 'react'
import { useConnectedMetaMask } from "metamask-react"
import { Stack, Typography, Box, Alert, Collapse } from '@mui/material'

import { networks } from '../../../constants/networks'
import { TextPaper } from '../../styles'
import NetworkSwitch from './NetworkSwitch/NetworkSwitch'


const WalletInfo = () => {
    const { account, chainId } = useConnectedMetaMask()

    return (
        <Stack alignItems='center' width='100%'>
            <TextPaper>
                <Box margin='0.2em' display='flex' justifyContent='center' alignItems='center' >
                    <Typography variant='h6' fontFamily='Helvetica' fontWeight='bold' color='White'>
                        Address: &nbsp;
                    </Typography>
                    <Typography variant='h6' fontFamily='Helvetica' color='White'>
                        {`${account.substring(0, 7)}...${account.substring(account.length - 6, account.length - 1)}`}
                    </Typography>
                </Box>
                <Box margin='0.2em' display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h6' fontFamily='Helvetica' fontWeight='bold' color='White'>
                        Chain: &nbsp;
                    </Typography>
                    <Typography variant='h6' fontFamily='Helvetica' color='White'>
                        {networks[chainId] ? networks[chainId] : `Unsupported Chain ${chainId}`}
                    </Typography>
                </Box>
            </TextPaper>
            <Box maxWidth='100%'>
                <Collapse in={!networks[chainId]}>
                    <Alert variant='filled' severity='error' sx={{ borderRadius: '0.5em' }}>
                        Chain unsupported, please choose another one
                    </Alert>
                </Collapse>
            </Box>
            {Object.keys(networks).map((key, index) => (
                <NetworkSwitch chainId={key} key={index} />
            ))}
        </Stack >
    )
}

export default WalletInfo