import React from 'react'
import { Grid, Box } from '@mui/material'

import LayerUpload from './LayerUpload/LayerUpload'
import LayerOrder from './LayerOrder/LayerOrder'

const LayerConfig = () => {
    return (
        <Grid container height='100%' direction="row" justifyContent="center" alignItems="space-between">
            <Grid height='100%' item xs={6} display='flex' justifyContent="center" alignItems='center' padding='1rem'>
                <Box height='90%' overflow='scroll' width='60%' padding='1rem' sx={{ border: '0.25rem solid', borderColor: '#00929a', borderRadius: '1.5rem' }}>
                    <LayerUpload />
                </Box>
            </Grid>
            <Grid height='100%' item xs={6} display='flex' justifyContent="center" alignItems='center' padding='1rem'>
                <Box height='90%' overflow='scroll' width='60%' padding='1rem' sx={{ border: '0.25rem solid', borderColor: '#00929a', borderRadius: '1.5rem' }}>
                    <LayerOrder />
                </Box>
            </Grid>
        </Grid >
    )
}

export default LayerConfig