import fs from "fs";
import path from "path";
import multer from "multer";
// const basePath = process.cwd();
const DIR = './public/';


export const layerStore = multer.diskStorage({
    destination: (req, file, cb) => {
        const writePath = path.join(DIR, req.params.proj, "layers", req.params.layer);
        if (!fs.existsSync(writePath)) {
            fs.mkdirSync(writePath, { recursive: true });
        }
        cb(null, writePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

export const layerUpload = multer({
    storage: layerStore,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            cb(err);
        }
    },
});