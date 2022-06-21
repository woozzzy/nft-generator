import React from "react";
import { TextField, Button, Typography, Paper, Box, FormControlLabel, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { updateConfig, createConfig } from "../../../actions/config";
import { getStyles } from "./styles";
import { setCurrentConfig } from "../../../slices/configSlice";

const Form = ({ theme }) => {
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    // const clear = () => { 
    //     setCurrentId(0);
    //     setCurrentConfig({
    //         nftName: '',
    //         nftDescription: '',
    //         startingEdition: 0,
    //         editionCount: 0,
    //         generateAll: false,
    //         height: 512,
    //         width: 512,
    //         layerOrder: [],
    //         debug: false,
    //     })
    // };

    const currentConfig = useSelector((state) => state.config.currentConfig);

    const handleSubmit = (e) => { 
        e.preventDefault();
        if (currentConfig._id) {
            dispatch(updateConfig(currentConfig._id, currentConfig));
        } else {
            dispatch(createConfig(currentConfig)) 
        }
		// clear();
    };

    const handleChange = (e) => {
        const data = {...currentConfig};
        data[e.target.name] = e.target.value;
        dispatch(setCurrentConfig(data));
    }

    return (
        <Paper sx={styles.paper}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={styles.form}>
                    <Typography variant="h6">
                        Settings
                    </Typography>
                    <TextField name="nftName" variant="outlined" size="small" label="Name" fullWidth value={currentConfig.nftName} onChange={handleChange} />
                    <TextField name="nftDescription" variant="outlined" size="small" label="Description" fullWidth value={currentConfig.nftDescription} onChange={handleChange} />
                    <TextField name="height" variant="outlined" size="small" label="Height" fullWidth value={currentConfig.height} onChange={handleChange} />
                    <TextField name="width" variant="outlined" size="small" label="Width" fullWidth value={currentConfig.width} onChange={handleChange} />
                    <TextField name="startingEdition" variant="outlined" size="small" label="Starting Edition" fullWidth value={currentConfig.startingEdition} onChange={handleChange} />
                    <TextField name="editionCount" variant="outlined" size="small" label="Edition Count" fullWidth value={currentConfig.editionCount} onChange={handleChange} />
                    <FormControlLabel
                        label="Generate All"
                        control={
                            <Checkbox
                                name="generateAll"
                                checked={currentConfig.generateAll} 
                                onChange={handleChange}
                            />
                        }
                    />
                    <FormControlLabel
                        label="Debug"
                        control={
                            <Checkbox
                                name="debug"
                                checked={currentConfig.debug} 
                                onChange={handleChange}
                            />
                        }
                    />
                    <Box sx={styles.buttons}>
                        <Button sx={styles.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Save</Button>
                    </Box>
                </Box>
            </form>
        </Paper >
    );
};

export default Form; 