// authService.js
import { Login } from "../api/Auth/auth";
import rolesData from "./roles.json";
import CryptoJS from "crypto-js";
const SECRET_KEY = "1234pallaveceFSDwd";

export const login = async (username, password) => {
  const encypted_password = encryptPassword(password);
  const payload = {
    username,
    password: encypted_password,
  };
  const response = await Login(payload);
  console.log("********* response *****************");
  console.log(response);

  if (response) {
    localStorage.setItem("user", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);
    return response;
  }
  return null;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const hasPermission = (permission) => {
  const user = getCurrentUser();
  if (!user) return false;

  const permissions = rolesData.permissions[user.role] || [];
  return permissions.includes(permission);
};

const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};
