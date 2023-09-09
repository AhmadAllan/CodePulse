import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchAllComments,
  fetchCommentsByProject,
  createComment,
  deleteComment,
  updateCommentStatus,
} from "../services/commentService";
import { useLocation } from "react-router-dom";
import { fetchProjectById } from "../services/projectService";
import Loader from "../components/Loader";

const CodeReview = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [createdBy] = useState(userInfo._id);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState(null);
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState("all");
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("all");

  const [status, setStatus] = useState("");

  const location = useLocation();

  const filteredComments =
    filter === ""
      ? comments // Show all comments if "all" is selected
      : comments.filter((comment) => comment.fileName === filter);

  useEffect(() => {
    console.log(location.state);
    async function fetchData() {
      try {
        const data = await fetchCommentsByProject(location.state);
        // const data = await fetchAllComments();
        const projectData = await fetchProjectById(location.state);
        setComments(data);
        setProject(projectData.projectInfo);
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
        project: location.state,
        createdBy,
        title,
        text,
        fileName: selectedFile,
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
    console.log(project);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
    console.log(project);
  };

  return (
    <div className="container mx-auto py-8">
      {project ? (
        <>
          <div className="border-l-2 pl-3 border-gray-900 mb-4">
            <h1 className="text-3xl font-bold mb-4 underline">Code Review</h1>
            <div className="flex">
              <h3 className="text-2xl font-bold mb-4">Project name: &nbsp;</h3>
              <h3 className="text-2xl mb-4">{project.project.name}</h3>
            </div>
          </div>

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
                Select File:
              </label>
              <select
                id="file"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
              >
                <option value="all">Across the project</option>
                {project.files.map((file) => (
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
            <div className="my-2 w-1/2">
              <label htmlFor="filter" className="text-lg block mb-1">
                Filter Comments:
              </label>
              <select
                id="filter"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="all">Across the project</option>
                {project.files.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
              </select>
            </div>
            {filteredComments.length === 0 ? (
              <p className="text-gray-600">No comments found.</p>
            ) : (
              <ul className="bg-gray-100 rounded-lg p-4 space-y-4">
                {filteredComments.map((comment) => (
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
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CodeReview;
