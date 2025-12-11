import axios from "axios";

// Backend auth routes URL
const API_URL = "http://localhost:5000/api/auth"; 

// -----------------------------
// Register User
// -----------------------------
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // optional, for cookies
    });
    return response.data; // { message, user, token }
  } catch (error) {
    console.error("Axios register error:", error); // log full error

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // backend error
    } else if (error.message) {
      throw new Error(error.message); // network / CORS error
    } else {
      throw new Error("Something went wrong during registration.");
    }
  }
};

// -----------------------------
// Login User
// -----------------------------
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // optional
    });
    return response.data; // { message, token, user }
  } catch (error) {
    console.error("Axios login error:", error); // log full error

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message); // backend error message
    } else if (error.message) {
      throw new Error(error.message); // network/CORS errors
    } else {
      throw new Error("Something went wrong during login.");
    }
  }
};
