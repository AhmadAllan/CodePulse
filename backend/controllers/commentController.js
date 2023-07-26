import expressAsyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

// function to create a new comment

const createComment = expressAsyncHandler(async (req, res) => {
    const { project, createBy, text } = req.body;
    
    // Create a new comment instance
    const newComment = await Comment.create({
      project,
      createBy, 
      text,
    });
    res.status(201).json(newComment);
  });
  
  //get all comment 
  const getAllComments = expressAsyncHandler(async(req, res) => {
    const comments = await Comment.find()
    res.json(comments)
  })



const getCommentsByCollaboration = expressAsyncHandler(async( req, res) => {
    const { projectId } = req.params;
    const comments = await Comment.find({ prject: projectId })
    .populate('createBy', 'username') // Populate author's username from the User model

    res.status(200).json(comments);

})


// Delete comment 
const deleteComment = expressAsyncHandler(async(req, res) => {
    const { projectId } = req.params;
    const comments = await Comment.findOneAndDelete({ project: projectId })
    res.status(200).json(comments);
})


// Update comment 
const updateComment = expressAsyncHandler(async(req, res) => {
    const { projectId } = req.params;
    const { text } = req.body
    const UpdateComment = await Comment.findOneAndUpdate(
        { project: projectId },
        {text},
        {new: true})
    if(UpdateComment) {
        text
    } else {
        res.status(404);
        throw new Error('Comment not found');

    }
  
    res.status(200).json(UpdateComment);
})
export  {
    createComment,
    getCommentsByCollaboration,
    getAllComments,
    deleteComment,
    updateComment
}