import axios from "axios";

const API = "http://localhost:5000/api/portfolio";

// ✅ Get all investments of logged-in user
export const getPortfolio = (token) =>
  axios.get(`${API}/list`, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Add investment
export const addInvestment = (data, token) =>
  axios.post(`${API}/add`, data, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Update investment
export const updateInvestment = (id, data, token) =>
  axios.put(`${API}/update/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Delete investment
export const deleteInvestment = (id, token) =>
  axios.delete(`${API}/delete/${id}`, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Get analytics
export const getAnalytics = (token) =>
  axios.get(`${API}/analytics`, { headers: { Authorization: `Bearer ${token}` } });

// ✅ Get user history
export const getHistory = (token) =>
  axios.get(`${API}/history`, { headers: { Authorization: `Bearer ${token}` } });
