import express from 'express'
import { createComment, getCommentsByCollaboration } from '../controllers/commentController.js';

const router = express.Router();

router.post('/', createComment);
router.get('/:projectId', getCommentsByCollaboration);

export default router;