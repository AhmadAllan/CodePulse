import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
},
{
    timestamps: true,
  }
  );

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;