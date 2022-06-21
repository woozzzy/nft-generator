import express from "express";

import { getArt, generateArt } from "../controller/generate.js";

const router = express.Router();

router.get('/', getArt);
router.post('/', generateArt);

export default router;