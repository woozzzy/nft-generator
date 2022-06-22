import React from "react";
import { Grid, Paper, Stack, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ArtCard from "./ArtCard/ArtCard";
import { downloadAll } from "../../actions/art";

const ArtGrid = ({ theme }) => {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.art.images);
    const styles = {
        paper: {
            margin: '10px 0',
            padding: theme.spacing(2),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "middle",
        },
        grid: {
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            margin: theme.spacing(1),
        },
        gridItem: {
            margin: '1em',
        }
    }

    const handleClick = (e) => {
        dispatch(downloadAll());
    }

    if (images && images.length > 0) {
        return (
            <Paper sx={styles.paper}>
                <Stack alignItems="center">
                    <Typography variant="h6">
                        Generated Art
                    </Typography>
                    <Button sx={styles.buttons} variant="contained" color='primary' component="label" onClick={handleClick} >
                        <Typography sx={styles.text}>Download</Typography>
                    </Button>
                    <Grid container justifyContent="center" sx={styles.grid}>
                        {
                            images.map((image, index) =>
                            (<Grid item xs={4} sm={3} md={2} key={index} sx={styles.gridItem}>
                                <ArtCard image={image} />
                            </Grid>))
                        }
                    </Grid>
                </Stack>
            </Paper>
        );
    } else {
        return;
    }
};

export default ArtGrid;

