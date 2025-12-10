import axios from "axios";

const API = "http://localhost:5000/api/portfolio";

export const getPortfolio = (token) =>
  axios.get(`${API}/`, { headers: { Authorization: token } });

export const addInvestment = (data, token) =>
  axios.post(`${API}/add`, data, { headers: { Authorization: token } });

export const updateInvestment = (id, data, token) =>
  axios.put(`${API}/update/${id}`, data, { headers: { Authorization: token } });

export const deleteInvestment = (id, token) =>
  axios.delete(`${API}/delete/${id}`, { headers: { Authorization: token } });

export const getAnalytics = (token) =>
  axios.get(`${API}/analytics`, { headers: { Authorization: token } });

export const getHistory = (token) =>
  axios.get(`${API}/history`, { headers: { Authorization: token } });
