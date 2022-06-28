import React from 'react'
import { Grid, Box } from '@mui/material'

import LayerUpload from './LayerUpload/LayerUpload'
import LayerOrder from './LayerOrder/LayerOrder'

const LayerConfig = () => {
    return (
        <Grid container height='100%' direction="row" justify="center" alignItems="space-between">
            <Grid item xs={6} display='flex' justifyContent="center">
                <Box width='60%' padding='1rem' sx={{ border: '0.25rem solid', borderColor: '#00929a', borderRadius: '1.5rem' }}>
                    <LayerUpload />
                </Box>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent="center">
                <Box width='60%' padding='1rem' sx={{ border: '0.25rem solid', borderColor: '#00929a', borderRadius: '1.5rem' }}>
                    <LayerOrder />
                </Box>
            </Grid>
        </Grid>
    )
}

export default LayerConfig