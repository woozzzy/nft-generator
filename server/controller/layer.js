import { mongoose } from 'mongoose'
import layerModel from "../models/layerModel.js"
import projectModel from '../models/projectModel.js'
import ipify from 'ipify'

export const getLayers = async (req, res) => {
    try {
        const { proj } = req.params
        const project = await projectModel.findById(proj)
        const layers = await layerModel.find({
            '_id': { $in: project.layerList.map((layer) => mongoose.Types.ObjectId(layer._id)) }
        }).sort({ order: 1 })

        res.status(201).json(layers)
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const uploadLayer = async (req, res) => {
    try {
        const { proj } = req.params
        const traitList = []
        const host = await ipify({ useIPv6: false })
        const url = req.protocol + '://' + host
        console.log(url)

        for (let i = 0; i < req.files.length; i++) {
            traitList.push({
                name: req.files[i].filename.replace(/\.[^/.]+$/, ""),
                layer: req.params.layer,
                weight: 1,
                filename: req.files[i].filename,
                path: url + '/' + encodeURI(req.files[i].path),
            })
        }

        let project = await projectModel.findById(proj)

        const newLayer = new layerModel({
            name: req.params.layer,
            traitList,
            order: project.layerList.length,
            totalWeight: traitList.length,
        })

        const result = await newLayer.save()
        project.layerList = project.layerList.concat(result)
        await project.save()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const updateLayer = async (req, res) => {
    const { proj, layer } = req.params
    const { name, order, traitList, totalWeight, } = req.body

    if (!mongoose.Types.ObjectId.isValid(layer)) return res.status(404).send(`No layer with id: ${layer}`)

    const updatedLayer = { name, order, traitList, totalWeight, _id: layer }
    await layerModel.findByIdAndUpdate(layer, updatedLayer, { new: true })

    let project = await projectModel.findById(proj)
    const updatedIndex = project.layerList.findIndex((obj) => obj._id === layer)
    project[updatedIndex] = updatedLayer
    await project.save()

    res.status(204).json({ message: "Updated Layer Succesfully!" })
}

export const updateOrder = async (req, res) => {
    const { proj } = req.params
    const newLayerList = req.body

    for (const layer of newLayerList) {
        if (!mongoose.Types.ObjectId.isValid(layer._id)) return res.status(404).send(`No layer with id: ${layer._id}`)
        await layerModel.findByIdAndUpdate(layer._id, { order: layer.order })
    }

    await projectModel.findByIdAndUpdate(proj, { layerList: newLayerList })

    res.status(204).json({ message: "Updated Order Succesfully!" })
}

export const deleteLayer = async (req, res) => {
    res.status(404).json({ message: 'Delete not implmented yet.' })
}

