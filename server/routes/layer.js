import express from "express";
import { upload } from "../middleware/upload.js";
import { getLayer, uploadLayer, updateLayer, deleteLayer, updateOrder } from "../controller/layer.js";

const router = express.Router();

router.get('/', getLayer);
router.post('/:layer', upload.array('layerUpload'), uploadLayer);
router.patch('/order', updateOrder);
router.patch('/update/:id', updateLayer);
router.delete('/', deleteLayer);


export default router;