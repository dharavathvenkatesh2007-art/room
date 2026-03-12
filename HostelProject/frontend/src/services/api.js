import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: "http://localhost:4000", // backend server URL
  withCredentials: true,            // allow cookies (for JWT auth)
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;