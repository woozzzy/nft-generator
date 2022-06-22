import { mongoose } from "mongoose";
import ConfigMessage from "../models/configMessage.js";


export const getConfig = async (req, res) => {
    try {
        const configMessages = await ConfigMessage.find();
        res.status(200).json(configMessages);
    } catch (error) {
        res.status(404).json({ message: error })
    }
};

export const createConfig = async (req, res) => {
    const newConfig = new ConfigMessage(req.body);
    try {
        await newConfig.save();
        res.status(201).json(newConfig);
    } catch (error) {
        res.status(409).json({ message: error })
    }
};

export const updateConfig = async (req, res) => {
    const { id } = req.params;
    const { nftName, nftDescription, createdAt, startingEdition, editionCount, generateAll, height, width, layerOrder, saveConfig, debug, } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No config with id: ${id}`);

    const updatedConfig = { nftName, nftDescription, createdAt, startingEdition, editionCount, generateAll, height, width, layerOrder, debug, _id: id };
    await ConfigMessage.findByIdAndUpdate(id, updatedConfig, { new: true });

    res.status(204).json(updatedConfig);
};

export const deleteConfig = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No config with id: ${id}`);

    await ConfigMessage.findByIdAndRemove(id);

    res.status(204).json({ message: 'Config deleted successfully' });
};
