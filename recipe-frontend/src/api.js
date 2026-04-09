import axios from "axios";

// Central API client; change VITE_API_BASE in .env if backend URL changes
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3000",
});

// --- ADD THIS INTERCEPTOR ---
api.interceptors.response.use(
  (response) => response, // Return the response if everything is OK
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // Handle specific error codes by redirecting
      if (status === 500) {
        window.location.href = "/500";
      } else if (status === 503) {
        window.location.href = "/503";
      } else if (status === 401) {
        // Optional: Handle unauthorized (session expired)
        console.warn("Unauthorized! Logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


// ----------------------------- auth only below -----------------------------
// Attach JWT automatically when available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export default api;
