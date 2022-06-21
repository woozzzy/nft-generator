import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";


const layerSchema = mongoose.Schema({
    name: String,
    imgCollection: {
        type: Array
    },
    order: {type: Number, default: 0, unique: false},
});

const layerModel = mongoose.model('layerModel', layerSchema);

export default layerModel;