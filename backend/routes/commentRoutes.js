import express from 'express'
import { createComment, getCommentsByCollaboration } from '../controllers/commentController';
const router = express.Router();

router.post('/', createComment);
router.get('/:projectId', getCommentsByCollaboration);

export default router