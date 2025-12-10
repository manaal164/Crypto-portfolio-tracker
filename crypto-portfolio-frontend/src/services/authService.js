import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 
// Your backend auth routes URL

// -----------------------------
// Register User
// -----------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // { message, user, token }
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return server message on error
    } else {
      throw error;
    }
  }
};

// -----------------------------
// Login User
// -----------------------------
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // { message, token, user }
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data; // Return server message on invalid credentials
    } else {
      throw error;
    }
  }
};
