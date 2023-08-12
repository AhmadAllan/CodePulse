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

export const updateProjectStatus = async (projectId, newName, newDescription, newMembers) => {
  try {
    await axios.put(`/api/projects/${projectId}`, {
        name: newName,
        description: newDescription,
        members: newMembers,
      });
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
};
