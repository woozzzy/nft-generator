import mongoose from "mongoose";

const traitSchema = mongoose.Schema({
    name: String,
    layer: String,
    weight: Number,
    filename: String,
    path: String,
});

export const layerSchema = mongoose.Schema({
    owner: String,
    name: String,
    order: { type: Number, default: 0, unique: false },
    traitList: [traitSchema],
    totalWeight: Number,
});

const layerModel = mongoose.model('layerModel', layerSchema);

export default layerModel;