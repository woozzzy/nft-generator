import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, List, ListItem, Box, Typography, ListItemIcon, TextField } from "@mui/material";

import { ListBox } from "../../../styles"

const EditDialog = ({ theme, open, onClose, currentLayer }) => {
    const [traitList, setTraitList] = useState();
    const [totalWeight, setTotalWeight] = useState();
    const [changed, setChanged] = useState(false);

    const handleClose = () => {
        onClose(changed
            ? { ...currentLayer, traitList, totalWeight }
            : null
        );
        setChanged(false);
    };

    useEffect(() => {
        setTraitList(currentLayer ? currentLayer.traitList : null);
        setTotalWeight(currentLayer ? currentLayer.totalWeight : null);
    }, [currentLayer, open])

    const handleChange = (e, trait, index) => {
        const value = parseInt(e.target.value);
        if (value >= 0) {
            let newTraitList = [
                ...traitList,
            ];
            newTraitList[index] = {
                ...trait,
                weight: value,
            };
            setTraitList(newTraitList);
            setTotalWeight(totalWeight - trait.weight + value);
            setChanged(true);
        }
    }


    const paperStyle = {
        backgroundColor: 'white',
        border: '0.35rem solid',
        borderColor: '#00929a',
        borderRadius: '1.5rem'
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='xs' PaperProps={{ style: { ...paperStyle, visibility: open ? 'visible' : 'hidden', } }}>
            <DialogTitle align="center" visibility={open ? 'visible' : 'hidden'} color="primary">Edit Layer: {open ? currentLayer.name : null}</DialogTitle>
            <form autoComplete="false">
                <Box sx={{ marginBottom: '2.5em' }} display='flex' alignItems='center' justifyContent='center' visibility={open ? 'visible' : 'hidden'}>
                    <List>
                        {open && traitList ? traitList.map((trait, index) => (
                            <ListItem key={trait._id}>
                                <ListBox display='flex' alignItems='center'>
                                    <ListItemIcon>
                                        <Box component="img" src={trait.path} sx={{
                                            height: '2rem',
                                            border: '0.15rem solid',
                                            borderRadius: '20%',
                                            background: 'darkgrey',
                                        }} />
                                    </ListItemIcon>
                                    <Box width='70%'>
                                        <Typography variant="body1" >{trait.name}</Typography>
                                    </Box>
                                    <TextField
                                        type="Number"
                                        sx={{ width: '30%' }}
                                        inputProps={{ style: { color: 'white', textAlign: 'center' } }}
                                        size="small"
                                        name="weight"
                                        label="weight"
                                        variant="outlined"
                                        focused
                                        color='secondary'
                                        value={trait.weight}
                                        onChange={(e) => handleChange(e, trait, index)}
                                    />
                                </ListBox>
                            </ListItem>
                        )) : null
                        }
                    </List>
                </Box>
            </form>
        </Dialog >
    );
};

export default EditDialog;

