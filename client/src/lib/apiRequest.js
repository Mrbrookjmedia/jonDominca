// lib/apiRequest.js
import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
  // baseURL:"http://localhost:4000/api"
});

apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add header
      console.log("Authorization header set:", token); // Debugging
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiRequest;
