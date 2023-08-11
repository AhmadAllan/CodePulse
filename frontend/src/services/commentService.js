import axios from "axios";

export const fetchAllComments = async () => {
  try {
    const response = await axios.get("/api/comments");
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const fetchCommentById = async (commentId) => {
  try {
    const response = await axios.get(`/api/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const fetchCommentsByProject = async (projectId) => {
  try {
    const response = await axios.get(`/api/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export const createComment = async (commentData) => {
  try {
    const response = await axios.post("/api/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    await axios.delete(`/api/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const updateCommentStatus = async (commentId, newStatus) => {
  try {
    await axios.put(`/api/comments/${commentId}`, { status: newStatus });
  } catch (error) {
    console.error("Error updating comment status:", error);
    throw error;
  }
};
