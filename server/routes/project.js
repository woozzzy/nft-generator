import express from "express"
import { authenticateToken } from "../middleware/user.js"
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../controller/project.js"

const router = express.Router()

router.get('/all', authenticateToken, getProjects)
router.get('/:id', authenticateToken, getProject)
router.post('/', authenticateToken, createProject)
router.patch('/:id', authenticateToken, updateProject)
router.delete('/:id', authenticateToken, deleteProject)

export default router