import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, Typography, Box } from "@mui/material"
import { Container, Draggable } from "react-smooth-dnd"
import { arrayMoveImmutable } from "array-move"
import { DragHandle } from "@mui/icons-material"

import EditDialog from './EditDialog/EditDialog'
import { updateLayer, updateOrder } from "../../../actions/layer"
import { ListBox } from "../../styles"
import { setCanContinue } from "../../../slices/pageSlice"

const LayerOrder = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.user.token)
    const layerList = useSelector((state) => state.project.layerList)
    const projID = useSelector((state) => state.project._id)
    const [open, setOpen] = useState(false)
    const [currentLayer, setCurrentLayer] = useState()

    const onDrop = async ({ removedIndex, addedIndex }) => {
        const newLayerList = arrayMoveImmutable(layerList, removedIndex, addedIndex).map((item, index) => ({ ...item, order: index }))
        await dispatch(updateOrder(projID, newLayerList, token))
    }

    const handleClickOpen = (e) => {
        setOpen(true)
        setCurrentLayer(layerList.find((layer) => layer.name === e.target.innerText))
    }

    const handleClose = (layer) => {
        setOpen(false)
        setCurrentLayer(null)
        if (layer) {
            dispatch(updateLayer(projID, layer._id, layer, token))
        }
    }

    useEffect(() => {
        if (layerList.length > 0) dispatch(setCanContinue(true))
    }, [layerList])

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
                                <ListItem button={true} onClick={handleClickOpen} >
                                    <ListBox>
                                        <ListItemText primary={name} sx={{ margin: '0 0.5rem' }} />
                                        <ListItemSecondaryAction>
                                            <ListItemIcon className="drag-handle">
                                                <Box display='flex' justifyContent='center' alignItems='center' width='100%'>
                                                    <DragHandle />
                                                </Box>
                                            </ListItemIcon>
                                        </ListItemSecondaryAction>
                                    </ListBox>
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

export default LayerOrder

