import axios from "axios";

export const fetchAllProjects = async () => {
  try {
    const response = await axios.get("/api/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchProjectById = async (projectId) => {
  try {
    const response = await axios.get(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post("/api/projects", projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    await axios.delete(`/api/projects/${projectId}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    await axios.put(`/api/projects/${projectId}`, projectData)
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};
