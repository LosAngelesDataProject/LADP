// services/authService.js
import axios from "axios";

const API = "https://localhost:7035/api/auth";

export const login = (payload) =>
    axios.post(`${API}/login`, payload, { withCredentials: true });

export const logout = () =>
    axios.post(`${API}/logout`, {}, { withCredentials: true });

export const getCurrentUser = () =>
    axios.get(`${API}/me`, { withCredentials: true });
