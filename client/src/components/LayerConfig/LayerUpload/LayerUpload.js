import React, { useEffect, useState } from 'react'
import { CloudUpload } from '@mui/icons-material'
import { useSnackbar } from 'notistack'

import { Button, Stack, Typography, Grid, Card, } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { uploadLayer } from '../../../actions/layer'
import { FormField } from '../../styles'

const LayerUpload = () => {
    const project = useSelector((state) => state.project)
    const user = useSelector((state) => state.user.user)
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const [files, setFiles] = useState({
        layerName: "",
        fileList: [],
        previewURLs: [],
        filesObj: null,
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)


    const clear = () => {
        setFiles({
            layerName: "",
            fileList: [],
            previewURLs: [],
            filesObj: null,
        })
        setFormErrors({})
        setIsSubmit(false)
    }

    const handleFileUpload = (e) => {
        const fileList = files.fileList.concat([...e.target.files])
        const previewURLs = fileList.map((file) => URL.createObjectURL(file))
        const filesObj = e.target.files
        setFiles({ ...files, fileList, previewURLs, filesObj })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormErrors(validate(files))

        setIsSubmit(true)
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            dispatch(uploadLayer(project._id, files, user.token))
            clear()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formErrors])

    const validate = (values) => {
        const errors = {}
        if (!values.layerName) {
            errors.layerName = "Layer name is required"
            enqueueSnackbar(errors.layerName, { variant: 'Error', autoHideDuration: 2000 });
        }
        if (values.fileList.length === 0) {
            errors.fileList = "You must upload at least 1 layer image"
            enqueueSnackbar(errors.fileList, { variant: 'Error', autoHideDuration: 2000 });
        }
        return errors
    }

    const imgPreview = (
        <>
            <Grid container direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                margin: '1rem',
            }}>
                {files.previewURLs.map((url) =>
                    <Card key={url} sx={{
                        height: 60,
                        width: 60,
                        margin: '0.25rem',
                        boxShadow: 3,
                        borderRadius: '10%',
                        backgroundColor: '#00929a',
                    }} component="img" alt="image" src={url}></Card>
                )}
            </Grid>
            <Button variant="contained" color="primary" type="submit" fullWidth>Add</Button>
        </>
    )

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack display='flex' justifyContent='center' alignItems='center'>
                <Typography variant="h6" color="primary">
                    Add Layers
                </Typography>
                <FormField name="layername" variant="outlined" focused size="small" label="Name of layer" value={files.layerName} fullWidth onChange={(e) => setFiles({ ...files, layerName: e.target.value })} />
                <Button variant="contained" color="primary" fullWidth component="label">
                    <CloudUpload />
                    &nbsp; Upload Images
                    <input accept="image/*" name="layerupload" id="contained-button-file" multiple hidden type="file" onChange={handleFileUpload} />
                </Button>
                {files.fileList.length > 0 ? imgPreview : null}
            </Stack>
        </form>
    )
}

export default LayerUpload