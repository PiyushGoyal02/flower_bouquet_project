import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Har request ke saath token auto-attach
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("flowerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
