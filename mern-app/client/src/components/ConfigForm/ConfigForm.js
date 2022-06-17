import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Form from './Form/Form';
import LayerOrder from './LayerOrder/LayerOrder';
import LayerUpload from "./LayerUpload/LayerUpload";
import { getConfigs } from "../../actions/config";
import { getLayers } from "../../actions/layer";

const ConfigForm = ({ props }) => {
    const { currentId } = props;
    const [configData, setConfigData] = useState({
        nftName: '',
        nftDescription: '',
        startingEdition: 0,
        editionCount: 0,
        generateAll: false,
        height: 512,
        width: 512,
        layerOrder: [],
        debug: false,
    });
    const config = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();

    const layers = useSelector((state) => state.layer.layerList); 

    useEffect(() => {
        dispatch(getConfigs());
        dispatch(getLayers());
    }, []);  

    useEffect(() => {
        if (config) setConfigData(config);
    }, [config]);

    return (
        <Grid container alignItems="stretch" direction="row" spacing={4}>
            <Grid item xs={4}>
                <Form props={{ ...props, configData, setConfigData }} ></Form>

            </Grid>
            <Grid item xs={4}>
                <LayerUpload props={{ ...props, configData, setConfigData }} />
                {layers.length > 0 ? <LayerOrder props={{ ...props, configData, setConfigData }} ></LayerOrder> : null}
            </Grid>
            <Grid item >

            </Grid>
        </Grid>
    );
};

export default ConfigForm; 