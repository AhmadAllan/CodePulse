import express from 'express'
import { createComment, getCommentsByCollaboration, getAllComments ,deleteComment, updateComment} from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/', getAllComments);
router.route('/:projectId')
.get(getCommentsByCollaboration)
.put(updateComment)
.delete(deleteComment)

export default router;