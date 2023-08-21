import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createProject, deleteProject, getAllProjects, getProject, updateProject } from "../controllers/projectController.js";

const router = express.Router();

router.post('/', createProject);
router.get('/', getAllProjects);
router.route('/:id')
.get(protect, getProject)
.put(protect, updateProject)
.delete(protect, deleteProject);

export default router;