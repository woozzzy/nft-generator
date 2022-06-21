import React from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Art from "./Art.js/Art";

const ArtGrid = ({ theme }) => {
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

    if (images && images.length > 0) {
        return (
            <Paper sx={styles.paper}>
                <Stack alignItems="center">
                    <Typography variant="h6">
                        Generated Art
                    </Typography>
                    <Grid container justifyContent="center" sx={styles.grid}>
                        {
                            images.map((image, index) =>
                            (<Grid item xs={4} sm={3} md={2} key={index} sx={styles.gridItem}>
                                <Art image={image} />
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

