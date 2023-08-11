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

  // const [project, setProject] = useState("");
  const [createdBy] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
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

  // Function to handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return;
    }

    try {
      const response = await createComment({
        // project,
        createdBy,
        title,
        text,
        status,
      });

      setComments([...comments, response]);
      setText("");
      setTitle("");
    } catch (error) {
      console.error("Error creating comment:", error);

      throw error;
    }
  };

  // Function to handle comment deletion
  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  // Function to handle category change for a comment
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

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Code Review</h1>
      {/* TODO: add this after finish project component */}
      {/* <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Select Project:</h2>
        <select
          value={selectedProject?.name || ''}
          onChange={(e) => handleProjectSelect(projectOptions.find((p) => p.name === e.target.value))}
          className="bg-gray-200 rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Project</option>
          {projectOptions.map((project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div> */}

      <form onSubmit={handleCommentSubmit} className="mb-4">
        <div className="my-2">
          <label htmlFor="title" className=" text-lg block mb-1">
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 focus:outline-none"
        >
          Submit Comment
        </button>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-2 mt-5">Comments</h2>
        {comments.length === 0 ? (
          <p>No Comment Found</p>
        ) : (
          <ul className="bg-gray-100 rounded-lg p-4">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="mb-2 border border-gray-300 p-2 rounded flex flex-col"
              >
                <p className="text-2xl font-bold pb-2">{comment.title}</p>
                <p className="ml-5 text-lg">{comment.text}</p>
                <div className="mt-auto flex items-center justify-end">
                  {/* Delete Button */}
                  <button
                    onClick={() => handleCommentDelete(comment._id)}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
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
