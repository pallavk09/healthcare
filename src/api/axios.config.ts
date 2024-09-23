import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3002/api/v1";

const axios_instance = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 1000,
});

axios_instance.defaults.headers.common["Content-Type"] = "application/json";

export default axios_instance;
