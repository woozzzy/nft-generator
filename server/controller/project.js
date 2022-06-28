import { mongoose } from "mongoose"
import projectModel from "../models/projectModel.js"


export const getProjects = async (req, res) => {
    try {
        const projects = await projectModel.find({
            '_id': { $in: req.user.projects.map((id) => mongoose.Types.ObjectId(id)) }
        })
        res.status(200).json(projects)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params

    if (!req.user.projects.includes(id)) return res.status(404).send(`Project with id: ${id} is not owned by user`)
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`Project with id: ${id} does not exist`)

    const project = await projectModel.findById(id)
    res.status(200).json(project)
}

export const createProject = async (req, res) => {
    const newProject = new projectModel(req.body)
    try {
        await newProject.save()
        res.status(201).json(newProject)

        newProject.save().then(result => {
            res.status(201).json(result)
        })
    } catch (error) {
        res.status(409).json({ message: error })
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params
    const { nftName, nftDescription, createdAt, startingEdition, editionCount, generateAll, height, width, layerOrder, debug, } = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No project with id: ${id}`)

    const updatedProject = { nftName, nftDescription, createdAt, startingEdition, editionCount, generateAll, height, width, layerOrder, debug, _id: id }
    await projectModel.findByIdAndUpdate(id, updatedProject, { new: true })

    res.status(204).json(updatedProject)
}

export const deleteProject = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No project with id: ${id}`)

    await projectModel.findByIdAndRemove(id)

    res.status(204).json({ message: 'Project deleted successfully' })
}

