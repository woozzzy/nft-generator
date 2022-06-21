import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Form from './Form/Form';
import LayerOrder from './LayerOrder/LayerOrder';
import LayerUpload from './LayerUpload/LayerUpload';
import GenerateBtn from './GenerateBtn/GenerateBtn';
import { getConfigs } from "../../actions/config";
import { getLayers } from "../../actions/layer";

const ConfigForm = ({ theme }) => {
    const dispatch = useDispatch();

    const layers = useSelector((state) => state.layer.layerList);

    useEffect(() => {
        dispatch(getConfigs());
        dispatch(getLayers());
    }, []);
    
    return (
        <Grid container alignItems="stretch" direction="row" spacing={4}>
            <Grid item xs={4}>
                <Form theme={theme}></Form>

            </Grid>
            <Grid item xs={4}>
                <LayerUpload theme={theme} />
                {layers && layers.length > 0 ? <LayerOrder theme={theme} ></LayerOrder> : null}
            </Grid>
            <Grid item xs={4}>
                <GenerateBtn theme={theme} />
            </Grid>
        </Grid>
    );
};

export default ConfigForm; 