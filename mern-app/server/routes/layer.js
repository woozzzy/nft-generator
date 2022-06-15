import express from "express";

import { getLayer, uploadLayer, updateLayer, deleteLayer } from "../controller/layer.js";

const router = express.Router();

router.get('/', getLayer);
router.post('/', uploadLayer);
router.patch('/', updateLayer);
router.delete('/', deleteLayer);

export default router;