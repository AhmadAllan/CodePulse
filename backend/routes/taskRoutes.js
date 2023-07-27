import express from 'express'
import { createTask, getTasksByProject, getAllTasks ,deleteTask, updateTask, getTaskById} from '../controllers/taskController.js';


const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/project/:projectId", getTasksByProject);

router.route("/:TaskId")
.get(getTaskById)
.put( updateTask)
.delete(deleteTask);

export default router;