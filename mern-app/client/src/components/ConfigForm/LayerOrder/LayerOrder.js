import React, { useState } from "react";
import { Paper, List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from "@mui/material";
import { Container, Draggable } from "react-smooth-dnd";
import { arrayMoveImmutable } from "array-move";
import { DragHandle } from "@mui/icons-material";

import { getStyles } from "./styles";

const LayerOrder = ({ props }) => {
    const { theme, configData, setConfigData } = props;
    const styles = getStyles(theme);

    const [items, setItems] = useState([
        ...configData.layerOrder,
    ]);

    const onDrop = ({ removedIndex, addedIndex }) => {
        setItems(items => arrayMoveImmutable(items, removedIndex, addedIndex));
    };

    return (
        <Paper sx={styles.paper}>
            <List>
                <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
                    {items.map(({ id, text }) => (
                        <Draggable key={id}>
                            <ListItem>
                                <ListItemText primary={text} />
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
        </Paper>
    );
};

export default LayerOrder;

