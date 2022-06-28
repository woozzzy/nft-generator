import mongoose from "mongoose";

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
    layerList: [String],
});


const projectModel = mongoose.model('projectModel', projectSchema);

export default projectModel;