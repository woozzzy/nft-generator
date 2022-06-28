import express from "express";
import { login, signup, getUser } from "../controller/user.js"
import { authenticateToken } from "../middleware/user.js"

const router = express.Router();

router.get('/get', authenticateToken, getUser)
router.post('/signup', signup)
router.post('/login', login)


export default router;