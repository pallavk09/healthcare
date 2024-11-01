import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:3002/api/v1";
const API_BASE_URL =
  "https://backends-heybnytn5-pallav-kumars-projects-a237a5e7.vercel.app/api/v1";

const axios_instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  // timeout: 1000,
});

axios_instance.defaults.headers.common["Content-Type"] = "application/json";

export default axios_instance;
