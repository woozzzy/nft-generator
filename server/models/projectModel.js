import mongoose from "mongoose"
import { layerSchema } from "./layerModel.js"

const projectSchema = mongoose.Schema({
    chain: String,
    owner: String,
    nftName: String,
    nftDescription: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    startingEdition: Number,
    editionCount: Number,
    generateAll: Boolean,
    height: Number,
    width: Number,
    debug: Boolean,
    layerList: [layerSchema],
    images: [String],
    metadata: [String],
})


const projectModel = mongoose.model('projectModel', projectSchema)

export default projectModel