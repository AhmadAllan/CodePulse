import axios from "axios";

export const userSearch = async (param) => {
    try {
        const response = await axios.get(`api/users/search?q=${param}`);
        return response;
    } catch (error) {
        console.error("no user found:", error);
        throw error;
    }
}