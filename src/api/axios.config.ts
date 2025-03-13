import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3002/api/v1";
// const API_BASE_URL =
//   "https://backends-heybnytn5-pallav-kumars-projects-a237a5e7.vercel.app/api/v1";

const axios_instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // timeout: 1000,
});

axios_instance.defaults.headers.common["Content-Type"] = "application/json";

// Add an interceptor to include Authorization token in all requests
axios_instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to every request
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios_instance;
