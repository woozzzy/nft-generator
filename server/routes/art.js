import express from "express";

import { authenticateToken } from "../middleware/user.js";
import { getArt, generateArt, downloadAllArt } from "../controller/art.js";

const router = express.Router();

router.get('/:proj', authenticateToken, getArt);
router.get('/:proj/download/all', authenticateToken, downloadAllArt);
router.post('/:proj', authenticateToken, generateArt);

export default router;