import React from "react";
import { Grid, Box, Stack, Typography, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ArtCard from "./ArtCard/ArtCard";
import { downloadAll, generateArt } from "../../../actions/art";

const ArtGrid = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project)
    const token = useSelector((state) => state.user.user.token)
    const images = useSelector((state) => state.project.images);

    const handleDownload = (e) => {
        dispatch(downloadAll(project, token));
    }

    const handleRegenerate = (e) => {
        dispatch(generateArt(project, token))
    }

    if (images && images.length > 0) {
        return (
            <Stack alignItems="center">
                <Typography variant="h6" color='primary'>
                    Generated Art
                </Typography>
                <Grid container justifyContent="center" width='60%' maxHeight='20rem' overflow='scroll' sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '1rem',
                }}>
                    {
                        images.map((image, index) =>
                        (<Grid item xs={3} sm={2} md={1} key={index} sx={{ margin: '1rem' }}>
                            <ArtCard image={image} />
                        </Grid>))
                    }
                </Grid>
                <Box width='100%' display='flex' justifyContent='center'>
                    <Button sx={{ margin: '1rem' }} variant="contained" color='primary' component="label" onClick={handleDownload} >
                        <Typography>Download</Typography>
                    </Button>
                    <Button sx={{ margin: '1rem' }} variant="contained" color='primary' component="label" onClick={handleRegenerate} >
                        <Typography>Regenerate</Typography>
                    </Button>

                </Box>
            </Stack>
        )
    } else {
        return (
            <CircularProgress size='8em' color='primary' />
        )
    }
};

export default ArtGrid;

