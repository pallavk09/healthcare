import axios_instance from "../axios.config";
import { Navigate } from "react-router-dom";
const Login = async (credentials: any) => {
  const { username, password } = credentials;
  const payload = {
    username,
    password,
  };
  const response = await axios_instance.post("/auth/login", payload);
  console.log(response);
  if (response?.data?.status === "SUCCESS") {
    return response.data;
  } else {
    return [];
  }
};

export { Login };
