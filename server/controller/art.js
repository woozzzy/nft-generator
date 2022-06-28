import { promises as fs } from 'fs';
import archiver from 'archiver';

import { buildTraitMap, generate, setupDir } from '../utils/art_engine.js';
import projectModel from '../models/projectModel.js';

export const getArt = async (req, res) => {
    try {
        const { proj } = req.params
        const images = await fs.readdir(`./public/${proj}/output/images`)
        const json = await fs.readdir(`./public/${proj}/output/json`)
        const url = req.protocol + '://' + req.get('host');
        res.status(200).json({
            images: images.map((image) => (url + `./public/${proj}output/images` + encodeURI(image))),
            json: json.map((json) => (url + `./public/${proj}output/json` + encodeURI(json)))
        });
    } catch (error) {
        return res.status(404).json({ message: "No NFTs have been generated yet.", error: error });
    }
};

export const downloadAllArt = async (req, res) => {
    const { proj } = req.params
    const archive = archiver('zip');
    archive.on('error', function (err) {
        res.status(500).send({ error: err.message });
    });
    archive.on('end', function () {
        console.log('Archive wrote %d bytes', archive.pointer());
    });

    res.status(200).attachment('archive-name.zip');
    archive.pipe(res);

    let directories = [`./public/${proj}/output/images`, `./public/${proj}/output/json`]

    for (let i in directories) {
        archive.directory(directories[i], directories[i].replace(`./public/${proj}/output`, ''));
    }

    archive.finalize();
}

export const generateArt = async (req, res) => {
    try {
        const { proj } = req.params
        await setupDir(proj);
        const config = req.body;
        const getTraitMap = await buildTraitMap(config.layerList)
        const ret = await generate(config, getTraitMap);
        const url = req.protocol + '://' + req.get('host');

        const images = ret.images.map((image) => (url + encodeURI(image.slice(1))))
        const metadata = ret.metadata.map((metadata) => (url + encodeURI(metadata.slice(1))))

        await projectModel.findByIdAndUpdate(proj, { images, metadata })

        res.status(201).json({
            message: "Art Generated Successfully",
            images,
            metadata,
            contract: (url + encodeURI(ret.contract.slice(1))),
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(404).json({ message: 'Generate was unseccessful', error: error });
    }
};