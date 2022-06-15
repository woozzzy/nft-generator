import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

import Form from './Form/Form';
import LayerOrder from './LayerOrder/LayerOrder';
import Upload from "./Upload/Upload";

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

    useEffect(() => {
        if (config) setConfigData(config);
    }, [config]);

    return (
        <Grid container alignItems="stretch" direction="row" spacing={4}>
            <Grid item xs={4}>
                <Form props={{ ...props, configData, setConfigData }} ></Form>

            </Grid>
            <Grid item xs={4}>
                <Upload props={{ ...props, configData, setConfigData }} />
                {configData.layerOrder.length > 0 ? <LayerOrder props={{ ...props, configData, setConfigData }} ></LayerOrder> : null}
            </Grid>
            <Grid item >

            </Grid>
        </Grid>
    );
};

export default ConfigForm; 