import express from "express";
import { layerUpload as upload } from "../middleware/upload.js";
import { authenticateToken } from "../middleware/user.js";
import { getLayers, uploadLayer, updateLayer, deleteLayer, updateOrder } from "../controller/layer.js";
const router = express.Router();

router.get('/:proj/all', authenticateToken, getLayers);
router.post('/:proj/:layer', [authenticateToken, upload.array('layerUpload')], uploadLayer);
router.patch('/:proj/order', authenticateToken, updateOrder);
router.patch('/:proj/:layer', authenticateToken, updateLayer);
router.delete('/:proj/:layer', authenticateToken, deleteLayer);


export default router;