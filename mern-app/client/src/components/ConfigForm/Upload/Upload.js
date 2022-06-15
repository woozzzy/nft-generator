import React, { useState } from 'react'
import { CloudUpload } from '@mui/icons-material';
import { Paper, Button, Box, Typography, Grid, TextField, Card, } from '@mui/material';
import { useDispatch } from 'react-redux';

import { getStyles } from "./styles";
import { uploadLayer } from '../../../actions/layer';

const Upload = ({ props }) => {
    const { theme, configData, setConfigData } = props;
    const styles = getStyles(theme);
    const dispatch = useDispatch();
    const [files, setFiles] = useState({
        layerName: "",
        fileList: [],
        previewURLs: [],
    });

    const clear = () => {
        setFiles({
            layerName: "",
            fileList: [],
            previewURLs: [],
        })
    }

    const handleFileUpload = (e) => {
        const fileList = [...e.target.files]
        const previewURLs = fileList.map((file) => URL.createObjectURL(file))
        setFiles({ ...files, fileList, previewURLs });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadLayer(files.fileList))
        const newLayerOrder = configData.layerOrder.concat({ id: 0, text: files.layerName })
        setConfigData({ ...configData, layerOrder: newLayerOrder, });
        clear();
    }

    const imgPreview = (
        <>
            <Grid container sx={styles.previewGrid} direction="row" alignItems="center" justifyContent="center" spacing={1}>
                {files.previewURLs.map((url) =>
                    <Card key={url} component="img" sx={styles.card} alt="image" src={url}></Card>
                )}
            </Grid>
            <Button sx={styles.buttons} variant="contained" color="primary" type="submit" fullWidth>Add</Button>
        </>
    )

    return (
        <Paper sx={styles.paper}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={styles.form}>
                    <Typography variant="h6">
                        Add Layers
                    </Typography>
                    <TextField name="layername" variant="outlined" size="small" label="Name of layer" value={files.layerName} fullWidth onChange={(e) => setFiles({ ...files, layerName: e.target.value })} />
                    <Button sx={styles.buttons} variant="contained" color="secondary" fullWidth component="label">
                        <CloudUpload />
                        &nbsp; Upload Images
                        <input accept="image/*" id="contained-button-file" multiple hidden type="file" onChange={handleFileUpload} />
                    </Button>
                    {files.fileList.length > 0 ? imgPreview : null}
                </Box>
            </form>

        </Paper>
    );
};

export default Upload