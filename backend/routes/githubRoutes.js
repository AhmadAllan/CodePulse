import express from 'express'
const router = express.Router();
import {
    getRepository,
    getUser,
    createRepo,
    deleteRepo,
    addCollaborator,
    removeCollaborator,
    fetchFile,
    updateFile,
    createFile,
    deleteFile,
    fetchFiles,

} from'../controllers/githubController.js'; // Import the controller module

router.get('/repository',getRepository);
router.get('/user', getUser);
router.post('/create-repo', createRepo);
router.delete('/delete-repo/:owner/:repo',deleteRepo);
router.post('/add-collaborator', addCollaborator);
router.delete('/remove-collaborator', removeCollaborator);
router.get('/fetch-file', fetchFile);
router.post('/update-file', updateFile);
router.post('/create-file', createFile);
router.delete('/delete-file', deleteFile);
router.get('/files',fetchFiles);

export default router