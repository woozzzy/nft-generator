import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, List, ListItem, Box, Typography, ListItemIcon, TextField } from "@mui/material";

import { getStyles } from "./styles";

const EditDialog = ({ theme, open, onClose, currentLayer }) => {
    const styles = getStyles(theme);
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


    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth='xs' PaperProps={{ style: { visibility: open ? 'visible' : 'hidden', } }}>
            <DialogTitle align="center" visibility={open ? 'visible' : 'hidden'}>Edit Layer: {open ? currentLayer.name : null}</DialogTitle>
            <form autoComplete="false">
                <Box sx={{ marginBottom: '2.5em' }} display='flex' alignItems='center' justifyContent='center' visibility={open ? 'visible' : 'hidden'}>
                    <List>
                        {open && traitList ? traitList.map((trait, index) => (
                            <ListItem key={trait._id} sx={styles.listItem}>
                                <ListItemIcon>
                                    <Box component="img" src={trait.path} sx={{ ...styles.trait, ...styles.img }} />
                                </ListItemIcon>
                                <Box sx={styles.box}>
                                    <Typography sx={styles.text} variant="body1" color="initial">{trait.name}</Typography>
                                    <TextField
                                        type="Number"
                                        sx={styles.textfield}
                                        inputProps={{ style: { textAlign: 'center' } }}
                                        size="small"
                                        variant="standard"
                                        name="weight"
                                        label="weight"
                                        value={trait.weight}
                                        onChange={(e) => handleChange(e, trait, index)}
                                    />
                                </Box>
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

