import express from "express";

import { getArt, generateArt, downloadAllArt } from "../controller/art.js";

const router = express.Router();

router.get('/', getArt);
router.get('/download/all', downloadAllArt);
router.post('/', generateArt);

export default router;