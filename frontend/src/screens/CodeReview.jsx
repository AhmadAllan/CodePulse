import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllComments,
  createComment,
  deleteComment,
  updateCommentStatus,
} from "../services/commentService";

const CodeReview = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [createdBy] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAllComments();
        setComments(data);
      } catch (error) {
        console.log("Error fetching comments:", error);
        throw error;
      }
    }
    fetchData();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "" || selectedFile.trim() === "") {
      return;
    }

    try {
      const response = await createComment({
        createdBy,
        title,
        text,
        file: selectedFile,
        status,
      });

      setComments([...comments, response]);
      setText("");
      setTitle("");
      setSelectedFile("");
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  const handleCommentStatusChange = async (commentId, newStatus) => {
    try {
      await updateCommentStatus(commentId, newStatus);
      setComments((prevComment) =>
        prevComment.map((comment) =>
          comment._id === commentId
            ? { ...comment, status: newStatus }
            : comment
        )
      );
    } catch (error) {
      console.error("Error updating comment status:", error);
      throw error;
    }
  };

  const fileOptions = [
    "main.js",
    "helpers.js",
    "header.js",
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Code Review</h1>

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="my-2">
          <label htmlFor="title" className="text-lg block mb-1">
            Comment
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Comment Title"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          name="comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Enter your comment..."
          rows="3"
        ></textarea>
        <div className="my-2">
          <label htmlFor="file" className="text-lg block mb-1">
            Select File
          </label>
          <select
            id="file"
            className="w-full px-4 py-2 border border-gray-300 rounded"
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
          >
            <option value="">Select a File</option>
            {fileOptions.map((file) => (
              <option key={file} value={file}>
                {file}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 focus:outline-none transition duration-300 ease-in-out"
        >
          Submit Comment
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-2 mt-5">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-600">No comments found.</p>
        ) : (
          <ul className="bg-gray-100 rounded-lg p-4 space-y-4">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="border border-gray-300 p-4 rounded-lg flex flex-col space-y-2"
              >
                <p className="text-xl font-semibold">{comment.title}</p>
                <p className="text-gray-700">{comment.text}</p>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => handleCommentDelete(comment._id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CodeReview;
