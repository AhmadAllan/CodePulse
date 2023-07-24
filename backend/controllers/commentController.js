import expressAsyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

// function to create a new comment

const createComment = expressAsyncHandler(async(req, res) => {
    const { ProjectId, CreateById, text } = req.body;

    // Create a new comment instance
    const newComment = await Comment.create({
        Project: ProjectId,
        createBy: CreateById,
        text,
      });

    res.status(201).json(newComment);
})

const getCommentsByCollaboration = expressAsyncHandler(async( req, res) => {
    const { projectId } = req.params;
    const comments = await Comment.find({ Project: projectId })
    .populate('createBy', 'username') // Populate author's username from the User model

    res.status(200).json(comments);

})

export  {
    createComment,
    getCommentsByCollaboration
}