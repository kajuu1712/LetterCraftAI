import axios from "axios";

const api = axios.create({
  // root address of backend server.
  baseURL: "https://lettercraftai-backend.onrender.com/api"          //http://localhost:8080/api
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export default api;