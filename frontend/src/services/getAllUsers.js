import axios from "axios";

const API_URL = "/api/users";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAllUsers`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
