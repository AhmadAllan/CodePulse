import express from 'express'
import { createComment, getCommentsByProject, getAllComments ,deleteComment, updateComment, getCommentById} from '../controllers/commentController.js';


const router = express.Router();

router.post("/", createComment);
router.get("/", getAllComments);
router.get("/project/:projectId", getCommentsByProject);

router.route("/:commentId")
.get(getCommentById)
.put( updateComment)
.delete(deleteComment);

export default router;