import React from "react";
import { Paper, Button, Typography } from "@mui/material";

import { getStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { generateArt } from "../../../actions/generate";
import { Box } from "@mui/system";

const GenerateBtn = ({ theme }) => {
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    const currentConfig = useSelector((state) => state.config.currentConfig);
    const layerOrder = useSelector((state) => state.layer.layerList);

    const handleClick = () => {
        const config = {
            ...currentConfig,
            layerOrder: layerOrder.map((layer) => layer.name).reverse()
        }
        dispatch(generateArt(config));
    };

    return (
        <Paper sx={styles.paper}>
            <Button sx={styles.buttons} variant="contained" color='error' component="label" onClick={handleClick} >
                <Typography sx={styles.text}>GENERATE</Typography>
            </Button>
        </Paper>
    );
};

export default GenerateBtn;

