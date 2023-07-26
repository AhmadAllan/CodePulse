import express from 'express'
<<<<<<< HEAD
import { createComment, getCommentsByCollaboration, getAllComments ,deleteComment, updateComment} from '../controllers/commentController.js';
=======
import { createComment, getCommentsByCollaboration } from '../controllers/commentController.js';
>>>>>>> main

const router = express.Router();

router.post('/', createComment);
router.get('/', getAllComments);
router.route('/:projectId')
.get(getCommentsByCollaboration)
.put(updateComment)
.delete(deleteComment)

export default router;