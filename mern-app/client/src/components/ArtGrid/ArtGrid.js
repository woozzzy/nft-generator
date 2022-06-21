import React, { useEffect } from "react";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getArt } from "../../actions/generate";
import Art from "./Art.js/Art";

const GenerateBtn = ({ theme }) => {
    const dispatch = useDispatch();

    const images = useSelector((state) => state.art.images);

    useEffect(() => {
        dispatch(getArt());
    }, [dispatch]);

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
                                (<Grid item xs={2} key={index} sx={styles.gridItem}>
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

export default GenerateBtn;

