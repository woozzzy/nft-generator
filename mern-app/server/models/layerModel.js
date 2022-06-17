import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";


const layerSchema = mongoose.Schema({
    name: String,
    imgCollection: {
        type: Array
    }
});

autoIncrement.initialize(mongoose.connection);

layerSchema.plugin(autoIncrement.plugin, {
    model: 'layerModel',
    field: 'order',
    startAt: 0,
    incrementBy: 1
})

const layerModel = mongoose.model('layerModel', layerSchema);

export default layerModel;