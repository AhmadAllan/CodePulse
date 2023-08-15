import axios from "axios";

export const getRepository = async (repoName) => {
  try {
    const response = await axios.get(`/api/github/repository?repo=${repoName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("/api/github/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const createRepo = async (name, description) => {
  try {
    const response = await axios.post("/api/github/create-repo", {
      name,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating repository:", error);
    throw error;
  }
};

export const deleteRepo = async (repo) => {
  try {
    await axios.delete("/api/github/delete-repo", {
      data: {
        repo,
      },
    });
  } catch (error) {
    console.error("Error deleting repository:", error);
    throw error;
  }
};

export const addCollaborator = async (repo, username) => {
  try {
    const response = await axios.post("/api/github/add-collaborator", {
      repo,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding collaborator:", error);
    throw error;
  }
};

export const removeCollaborator = async (repo, username) => {
  try {
    const response = await axios.post("/api/github/remove-collaborator", {
      repo,
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error removing collaborator:", error);
    throw error;
  }
};

export const fetchFile = async (repo, path) => {
  try {
    const response = await axios.get(`/api/github/fetch-file?repo=${repo}&path=${path}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching file:", error);
    throw error;
  }
};

export const updateFile = async (repo, path, content, commitMessage) => {
  try {
    const response = await axios.post("/api/github/update-file", {
      repo,
      path,
      content,
      commitMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating file:", error);
    throw error;
  }
};

export const createFile = async (repo, path, content, commitMessage) => {
  try {
    const response = await axios.post("/api/github/create-file", {
      repo,
      path,
      content,
      commitMessage,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating file:", error);
    throw error;
  }
};

export const deleteFile = async (repo, path) => {
  try {
    const response = await axios.post("/api/github/delete-file", {
      repo,
      path,
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export const fetchFiles = async (repo) => {
  try {
    const response = await axios.get(`/api/github/files?repo=${repo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};
