import { promises as fs } from 'fs';
import { buildTraitMap, generate, setupDir } from '../scripts/art_engine.js';
import zip from 'express-zip';

export const getArt = async (req, res) => {
    try {
        const images = await fs.readdir('./public/output/images')
        const url = req.protocol + '://' + req.get('host');
        res.status(200).json({ images: images.map((image) => (url + '/public/output/images/' + encodeURI(image))) });
    } catch (error) {
        return res.status(404).json({ message: "No NFTs have been generated yet.", error: error });
    }
};

export const downloadAllArt = async (req, res) => {
    try {
        res.zip(files.map('./public/output/'));
    } catch (error) {
        return res.status(404).json({ message: "Download doesn't work yet.", error: error });
    }
}

export const generateArt = async (req, res) => {
    try {
        await setupDir();
        const config = req.body;
        const traitMap = await buildTraitMap()
        const ret = await generate(config, traitMap);

        const images = await fs.readdir('./public/output/images')
        const url = req.protocol + '://' + req.get('host');

        res.status(201).json({
            message: "Art Generated Successfully",
            images: images.map((image) => (url + '/public/output/images/' + encodeURI(image)))
        });
    } catch (error) {
        console.log("error: ", error);
        res.status(404).json({ message: 'Generate was unseccessful', error: error });
    }
};