import axios from "axios";

// Central API client; change VITE_API_BASE in .env if backend URL changes
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});

// Attach JWT automatically when available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
