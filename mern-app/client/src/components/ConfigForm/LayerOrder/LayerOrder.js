import React, { useState, useEffect } from "react";
import { Paper, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Typography, Stack } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { DragHandle } from "@mui/icons-material";

import { getStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../../actions/layer";

const LayerOrder = ({ props }) => {
    const { theme, } = props;
    const styles = getStyles(theme);
    const dispatch = useDispatch();

    const layers = useSelector((state) => state.layer.layerList);

    const [items, setItems] = useState(layers.slice());


    useEffect(() => {
        setItems(layers.slice());
    }, [layers.length])

    useEffect(() => {
        let idsToUpdate = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i]._id !== layers[i]._id) {
                idsToUpdate.push({
                    id: items[i]._id,
                    name: items[i].name,
                    currentOrder:items[i].order ,
                    newOrder: i,
                });
            }
        }
        // dispatch(updateOrder(idsToUpdate));
    }, [items])


    const onDrop = ({ removedIndex, addedIndex }) => {
        setItems(arrayMoveImmutable(items, removedIndex, addedIndex));
    }

    return (
        <Paper sx={styles.paper}>
            <Typography fontSize='Small' textAlign='center' color='lightgrey'> Top </Typography>
            <List>
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {items.map(({ _id, name }) => (
                        <Draggable key={_id}>
                            <ListItem>
                                <ListItemText primary={name} />
                                <ListItemSecondaryAction>
                                    <ListItemIcon className="drag-handle">
                                        <DragHandle />
                                    </ListItemIcon>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Draggable>
                    ))}
                </Container>
            </List>
            <Typography fontSize='Small' textAlign='center' color='lightgrey'> Bottom </Typography>
        </Paper>
    );
};

export default LayerOrder;

