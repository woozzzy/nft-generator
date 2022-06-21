import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import Form from './Form/Form';
import LayerOrder from './LayerOrder/LayerOrder';
import LayerUpload from './LayerUpload/LayerUpload';
import GenerateBtn from './GenerateBtn/GenerateBtn';

const ConfigForm = ({ theme }) => {
    const layers = useSelector((state) => state.layer.layerList);

    return (
        <Grid container alignItems="stretch" direction="row" spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <Form theme={theme}></Form>

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <LayerUpload theme={theme} />
                {layers && layers.length > 0 ? <LayerOrder theme={theme} ></LayerOrder> : null}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <GenerateBtn theme={theme} />
            </Grid>
        </Grid>
    );
};

export default ConfigForm; 