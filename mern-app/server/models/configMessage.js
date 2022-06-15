import mongoose from "mongoose";

const layerSchema = mongoose.Schema({
    name: String,
});

const configSchema = mongoose.Schema({    
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
    layerOrder: [layerSchema],
    debug: Boolean,
});


const ConfigMessage = mongoose.model('ConfigMessage', configSchema);

export default ConfigMessage;