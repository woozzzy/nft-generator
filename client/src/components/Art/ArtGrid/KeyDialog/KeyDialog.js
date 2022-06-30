import React, { useState } from "react";
import { Dialog, DialogTitle, Typography, Stack, Button } from "@mui/material";

import { FormField } from "../../../styles";

const KeyDialog = ({ open, onClose }) => {
    const [key, setKey] = useState('');

    const handleClose = () => {
        onClose(key)
    }

    const handleChange = (e) => {
        setKey(e.target.value)
    }

    const handleSubmit = () => {
        onClose(key)
    }


    const paperStyle = {
        backgroundColor: 'white',
        border: '0.35rem solid',
        borderColor: '#00929a',
        borderRadius: '1.5rem'
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='xs' PaperProps={{ style: { ...paperStyle, visibility: open ? 'visible' : 'hidden', } }}>
            <DialogTitle align="center" visibility={open ? 'visible' : 'hidden'} color="primary"> Upload to Filecoin with NFT.Storage</DialogTitle>
            <form autoComplete="false">
                <Stack alignItems="center">
                    <FormField color="primary" focused name="apikey" variant="outlined" size="small" label="nft.storage api key" value={key} onChange={handleChange} />
                    <Button sx={{ margin: '1rem' }} variant="contained" color='primary' component="label" onClick={handleSubmit} >
                        <Typography>Upload</Typography>
                    </Button>

                </Stack>
            </form>
        </Dialog >
    );
};

export default KeyDialog;

