import { promises as fs } from 'fs';
import layerModel from "../models/layerModel.js";
import archiver from 'archiver';
import path from 'path';

import { buildTraitMap, generate, setupDir } from '../utils/art_engine.js';

export const getArt = async (req, res) => {
    try {
        const images = await fs.readdir('./public/output/images')
        const url = req.protocol + '://' + req.get('host');
        res.status(200).json({ images: images.map((image) => (url + '/api/public/output/images/' + encodeURI(image))) });
    } catch (error) {
        return res.status(404).json({ message: "No NFTs have been generated yet.", error: error });
    }
};

export const downloadAllArt = async (req, res) => {
    const archive = archiver('zip');
    archive.on('error', function (err) {
        res.status(500).send({ error: err.message });
    });
    archive.on('end', function () {
        console.log('Archive wrote %d bytes', archive.pointer());
    });

    res.attachment('archive-name.zip');
    archive.pipe(res);

    let directories = ['./public/output/images', './public/output/json']

    for (let i in directories) {
        archive.directory(directories[i], directories[i].replace('./public/output', ''));
    }

    archive.finalize();
}

export const generateArt = async (req, res) => {
    try {
        await setupDir();
        const config = req.body;
        const layerModels = await layerModel.find().sort({ order: 1 });
        const getTraitMap = await buildTraitMap(layerModels)
        const ret = await generate(config, getTraitMap);
        const url = req.protocol + '://' + req.get('host');

        res.status(201).json({
            message: "Art Generated Successfully",
            images: ret.images.map((image) => (url + encodeURI(image.slice(1)))).sort(),
            metadata: ret.metadata.map((metadata) => (url + encodeURI(metadata.slice(1)))),
            contract: (url + encodeURI(ret.contract.slice(1))),
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(404).json({ message: 'Generate was unseccessful', error: error });
    }
};