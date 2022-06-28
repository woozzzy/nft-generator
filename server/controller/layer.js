import { mongoose } from 'mongoose'
import layerModel from "../models/layerModel.js"


export const uploadLayer = async (req, res) => {
    try {
        const traitList = []
        const url = req.protocol + '://' + req.get('host')

        for (let i = 0; i < req.files.length; i++) {
            traitList.push({
                name: req.files[i].filename.replace(/\.[^/.]+$/, ""),
                layer: req.params.layer,
                weight: 1,
                filename: req.files[i].filename,
                path: url + '/' + encodeURI(req.files[i].path),
            })
        }

        const newLayer = new layerModel({
            name: req.params.layer,
            traitList,
            order: await layerModel.countDocuments(),
            totalWeight: traitList.length,
        })

        newLayer.save().then(result => {
            res.status(201).json(result)
        })
    } catch (error) {
        res.status(500).json({ error: err })
    }

}

export const getLayer = async (req, res) => {
    try {
        const layerModels = await layerModel.find().sort({ order: 1 })
        res.status(201).json(layerModels)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const updateLayer = async (req, res) => {
    const { id } = req.params
    const { name, order, traitList, totalWeight, } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No layer with id: ${id}`)

    const updatedLayer = { name, order, traitList, totalWeight, _id: id }
    await layerModel.findByIdAndUpdate(id, updatedLayer, { new: true })

    res.status(204).json({ message: "Updated Layer Succesfully!" })
}

export const updateOrder = async (req, res) => {
    const idsToUpdate = req.body

    for (const layer of idsToUpdate) {
        if (!mongoose.Types.ObjectId.isValid(layer._id)) return res.status(404).send(`No layer with id: ${layer._id}`)
        await layerModel.findByIdAndUpdate(layer._id, { order: layer.order })
    }

    res.status(204).json({ message: "Updated Order Succesfully!" })
}

export const deleteLayer = async (req, res) => {
    res.status(404).json({ message: 'Delete not implmented yet.' })
}

