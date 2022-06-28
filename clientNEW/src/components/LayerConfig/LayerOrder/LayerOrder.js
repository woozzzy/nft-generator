import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Typography } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { DragHandle } from "@mui/icons-material";

import EditDialog from './EditDialog/EditDialog'
import { updateLayer, updateOrder } from "../../../actions/layer";

const LayerOrder = () => {
    const dispatch = useDispatch();

    const layerList = useSelector((state) => state.project.layerList);
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
        <>
            <Typography visibility={layerList && layerList.length > 0 ? 'visible' : 'hidden'} fontSize='Small' textAlign='center' color='primary'>
                Top
            </Typography>
            <List>
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {layerList && layerList.length > 0
                        ? layerList.map(({ _id, name }) => (
                            <Draggable key={_id}>
                                <ListItem button={true} onClick={handleClickOpen}>
                                    <ListItemText primary={name} />
                                    <ListItemSecondaryAction>
                                        <ListItemIcon className="drag-handle">
                                            <DragHandle />
                                        </ListItemIcon>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </Draggable>))
                        : <Typography fontSize='Large' textAlign='center' color='primary'> No Layers Added Yet </Typography>}
                    <EditDialog
                        open={open}
                        onClose={handleClose}
                        currentLayer={currentLayer}
                    />
                </Container>
            </List>
            <Typography visibility={layerList && layerList.length > 0 ? 'visible' : 'hidden'} fontSize='Small' textAlign='center' color='primary'>
                Bottom
            </Typography>
        </>
    )
}

export default LayerOrder;

