import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import layerModel from "../models/layerModel.js";


export const uploadLayer = async (req, res) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');

    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/' + encodeURI(req.files[i].path));
    }

    const layer = new layerModel({
        name: req.files[0].originalname.split('-')[1],
        imgCollection: reqFiles,
    });

    layer.save().then(result => {
        res.status(201).json({
            layerCreated: {
                _id: result._id,
                name: req.files[0].originalname.split('-')[1],
                order: result.order,
                imgCollection: result.imgCollection
            }
        });
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    });
};

export const getLayer = async (req, res) => {
    try {
        const layerModels = await layerModel.find().sort({order: 1});
        res.status(201).json(layerModels);
    } catch (error) {
        res.status(409).json({ message: error })
    }
};

export const updateLayer = async (req, res) => {
    const { id } = req.params;
    const { name, order, imgCollection } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No layer with id: ${id}`);

    const updatedLayer = { name, order, imgCollection, _id: id };
    await layerModel.findByIdAndUpdate(id, updatedLayer, { new: true });

    res.status(204).json(updatedLayer);
};

export const updateOrder = async (req, res) => {
    // const { idA, idB, indexA, indexB } = req.params;
    const idsToUpdate = req.body
    console.log(idsToUpdate)
    
    // for (const layer of idsToUpdate) {
    //     if (!mongoose.Types.ObjectId.isValid(layer.id)) return res.status(404).send(`No layer with id: ${id}`);
    //     await layerModel.findByIdAndUpdate(layer.id, {order: layer.order})
    // }

    res.status(204).json({message: "Updated orders",});
};

export const deleteLayer = async (req, res) => {
    res.status(404).json({ message: 'Delete not implmented yet.' });
};

