import express from "express";

import { getConfig, createConfig, updateConfig, deleteConfig } from "../controller/config.js";

const router = express.Router();

router.get('/', getConfig);
router.post('/', createConfig);
router.patch('/:id', updateConfig);
router.delete('/:id', deleteConfig);

export default router;