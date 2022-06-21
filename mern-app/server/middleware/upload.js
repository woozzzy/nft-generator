import fs from "fs";
import path from "path";
import multer from "multer";
// const basePath = process.cwd();
const DIR = './public/layers';


export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const writePath = path.join(DIR, req.params.layer);
        if (!fs.existsSync(writePath)) {
            fs.mkdirSync(writePath, { recursive: true });
        }
        cb(null, writePath)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

export const upload = multer({
    storage: storage,
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