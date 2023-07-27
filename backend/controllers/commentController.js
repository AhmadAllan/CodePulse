import expressAsyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";

// function to create a new comment

const createComment = expressAsyncHandler(async (req, res) => {
  const { project, createdBy, text, toUser } = req.body;

  // Create a new comment instance
  const newComment = await Comment.create({
    project,
    createdBy,
    text,
    toUser,
  });
  res.status(201).json(newComment);
});

//get all comment
const getAllComments = expressAsyncHandler(async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

// get comments by project Id
const getCommentsByProject = expressAsyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const comments = await Comment.find({ project: projectId }).populate(
    "createdBy",
    "username"
  ); // Populate author's username from the User model

  res.status(200).json(comments);
});

// get comments by comment Id
const getCommentById = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params;
  const comments = await Comment.findById(commentId).populate(
    "createdBy",
    "username"
  ); // Populate author's username from the User model

  res.status(200).json(comments);
});

// Delete comment
const deleteComment = expressAsyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const deletedComment = await Comment.findOneAndDelete({ _id: commentId });
  if (!deletedComment) {
    res.status(404);
    throw new Error("Comment not found");
  }
  res.status(200).json({ message: "Comment deleted successfully" });
});

// Update comment
const updateComment = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params; // Assuming the commentId is passed as a parameter
    const { text, toUser } = req.body;
    
    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId },
      { text, toUser },
      { new: true }
    );
  
    if (!updatedComment) {
      res.status(404);
      throw new Error('Comment not found');
    }
  
    res.status(200).json(updatedComment);
  });
  
export {
  createComment,
  getCommentsByProject,
  getCommentById,
  getAllComments,
  deleteComment,
  updateComment,
};
