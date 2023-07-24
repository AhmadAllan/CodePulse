import express from 'express'
import { createComment } from '../controllers/commentController';
import { getCommentsByCollaboration } from '../controllers/commentController';
const router = express.Router();

router.post('/', createComment);
router.get('/:projectId', getCommentsByCollaboration);

module.exports = router;
