import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    require: true,
  },
  fileName: {
    type: String
  }
},
{
    timestamps: true,
  }
  );

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;