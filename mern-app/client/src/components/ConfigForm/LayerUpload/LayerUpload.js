import React, { useEffect, useState } from 'react'
import { CloudUpload } from '@mui/icons-material';
import { Paper, Button, Box, Typography, Grid, TextField, Card, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getStyles } from "./styles";
import { uploadLayer } from '../../../actions/layer';

const LayerUpload = ({ props }) => {
    const { theme, configData, setConfigData } = props;
    const styles = getStyles(theme);
    const dispatch = useDispatch();
    const [files, setFiles] = useState({
        layerName: "",
        fileList: [],
        previewURLs: [],
        filesObj: null,
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const clear = () => {
        setFiles({
            layerName: "",
            fileList: [],
            previewURLs: [],
            filesObj: null,
        });
        setFormErrors({});
        setIsSubmit(false);
    }

    const handleFileUpload = (e) => {
        const fileList = files.fileList.concat([...e.target.files]);
        const previewURLs = fileList.map((file) => URL.createObjectURL(file));
        const filesObj = e.target.files;
        setFiles({ ...files, fileList, previewURLs, filesObj });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(files));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(uploadLayer(files))
            clear();
        }
    }, [formErrors])

    const validate = (values) => {
        const errors = {};
        if (!values.layerName) {
            errors.layerName = "Layer name is required";
        }
        if (values.fileList.length === 0) {
            errors.fileList = "You must upload at least 1 layer image";
        }
        return errors;
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
                    <Typography fontSize='small' sx={{color: 'red'}}>{formErrors.layerName}</Typography>
                    <Button sx={styles.buttons} variant="contained" color="secondary" fullWidth component="label">
                        <CloudUpload />
                        &nbsp; Upload Images
                        <input accept="image/*" name="layerupload" id="contained-button-file" multiple hidden type="file" onChange={handleFileUpload} />
                    </Button>
                    {files.fileList.length > 0 ? imgPreview : null}
                    <Typography fontSize='small' sx={{color: 'red'}}>{formErrors.fileList}</Typography>
                </Box>
            </form>

        </Paper>
    );
};

export default LayerUpload