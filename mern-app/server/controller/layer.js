import { promises as fs } from 'fs';
import { upload } from '../middleware/upload.js';

export const uploadLayer = async (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.status(413).send({ error: { message: err.message } }).end();
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }

        res.status(200).end('Files uploaded successfully.');
    });
};

export const getLayer = async (req, res) => {
    try {

        res.status(201)
    } catch (error) {
        res.status(409).json({ message: error })
    }
};

export const updateLayer = async (req, res) => {
    res.status(404).json({ message: 'Update not implmented yet.' });
};

export const deleteLayer = async (req, res) => {
    res.status(404).json({ message: 'Delete not implmented yet.' });
};
