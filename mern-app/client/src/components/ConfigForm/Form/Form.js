import React from "react";
import { TextField, Button, Typography, Paper, Box, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";

import { updateConfig, createConfig } from "../../../actions/config";
import { getStyles } from "./styles";

const Form = ({ props }) => {
    const { theme, currentId, setCurrentId, configData, setConfigData } = props;
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    const clear = () => { 
        setCurrentId(0);
        setConfigData({
            nftName: '',
            nftDescription: '',
            startingEdition: 0,
            editionCount: 0,
            generateAll: false,
            height: 512,
            width: 512,
            layerOrder: [],
            debug: false,
        })
    };

    const handleSubmit = (e) => { 
        e.preventDefault();

        if (currentId) {
			dispatch(updateConfig(currentId, configData));
		} else {
			dispatch(createConfig(configData));
		}
		clear();
    };

    return (
        <Paper sx={styles.paper}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={styles.form}>
                    <Typography variant="h6">
                        Settings
                    </Typography>
                    <TextField name="nftname" variant="outlined" size="small" label="Name" fullWidth value={configData.nftName} onChange={(e) => setConfigData({ ...configData, nftName: e.target.value })} />
                    <TextField name="nftDescription" variant="outlined" size="small" label="Description" fullWidth value={configData.nftDescription} onChange={(e) => setConfigData({ ...configData, nftDescription: e.target.value })} />
                    <TextField name="height" variant="outlined" size="small" label="Height" fullWidth value={configData.height} onChange={(e) => setConfigData({ ...configData, height: e.target.value })} />
                    <TextField name="width" variant="outlined" size="small" label="width" fullWidth value={configData.width} onChange={(e) => setConfigData({ ...configData, width: e.target.value })} />
                    <TextField name="startingEdition" variant="outlined" size="small" label="Starting Edition" fullWidth value={configData.startingEdition} onChange={(e) => setConfigData({ ...configData, startingEdition: e.target.value })} />
                    <TextField name="editionCount" variant="outlined" size="small" label="Edition Count" fullWidth value={configData.editionCount} onChange={(e) => setConfigData({ ...configData, editionCount: e.target.value })} />
                    <FormControlLabel
                        label="Generate All"
                        control={
                            <Checkbox
                                name="generateAll"
                                checked={configData.generateAll} 
                                onChange={(e) => setConfigData({ ...configData, generateAll: e.target.checked })}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Debug"
                        control={
                            <Checkbox
                                name="debug"
                                checked={configData.debug} 
                                onChange={(e) => setConfigData({ ...configData, debug: e.target.checked })}
                            />
                        }
                    />
                    <Box sx={styles.buttons}>
                        <Button sx={styles.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Generate</Button>
                    </Box>
                </Box>
            </form>
        </Paper >
    );
};

export default Form; 