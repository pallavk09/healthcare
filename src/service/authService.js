// authService.js
import rolesData from "./roles.json";

export const login = (username, password) => {
  const user = rolesData.users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
  return null;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const hasPermission = (permission) => {
  const user = getCurrentUser();
  if (!user) return false;

  const permissions = rolesData.permissions[user.role] || [];
  return permissions.includes(permission);
};
