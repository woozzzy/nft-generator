import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Typography } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { DragHandle } from "@mui/icons-material";

import { getStyles } from "./styles";
import { updateLayer, updateOrder } from "../../../actions/layer";
import EditDialog from "./EditDialog/EditDialog";

const LayerOrder = ({ theme }) => {
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    const layerList = useSelector((state) => state.layer.layerList);
    const [open, setOpen] = useState(false);
    const [currentLayer, setCurrentLayer] = useState();

    const onDrop = async ({ removedIndex, addedIndex }) => {
        const newLayerList = arrayMoveImmutable(layerList, removedIndex, addedIndex).map((item, index) => ({ ...item, order: index }));
        await dispatch(updateOrder(newLayerList));
    }

    const handleClickOpen = (e) => {
        setOpen(true);
        setCurrentLayer(layerList.find((layer) => layer.name === e.target.innerText));
    };

    const handleClose = (layer) => {
        setOpen(false);
        setCurrentLayer(null);
        if (layer) {
            dispatch(updateLayer(layer._id, layer));
        }
    };



    return (
        <Paper sx={styles.paper}>
            <Typography fontSize='Small' textAlign='center' color='lightgrey'> Top </Typography>
            <List>
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {layerList.map(({ _id, name }) => (
                        <Draggable key={_id}>
                            <ListItem button={true} onClick={handleClickOpen}>
                                <ListItemText primary={name} />
                                <ListItemSecondaryAction>
                                    <ListItemIcon className="drag-handle">
                                        <DragHandle />
                                    </ListItemIcon>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Draggable>
                    ))}
                    <EditDialog
                        open={open}
                        onClose={handleClose}
                        currentLayer={currentLayer}
                    />
                </Container>
            </List>
            <Typography fontSize='Small' textAlign='center' color='lightgrey'> Bottom </Typography>
        </Paper>
    );
};

export default LayerOrder;

