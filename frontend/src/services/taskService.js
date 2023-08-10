import axios from "axios";

export const fetchAllTasks = async () => {
  try {
    const response = await axios.get("/api/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post("/api/tasks", taskData);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};
