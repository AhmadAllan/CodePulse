import express from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post('/', createProject);
router.get('/', getAllProjects)
router.route('/:id')
.get(() => getProject)
.put(() => updateProject)
.delete(() => deleteProject)


export default router; 