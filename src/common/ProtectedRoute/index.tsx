import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // If token exists, user is authenticated
};

interface ProtectedRouteProps {
  children: ReactNode; // Accepts any valid React node
}

//The component returns {children} wrapped in a fragment (<>...</>) instead of directly returning children. This helps ensure that the return type is a valid React node
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
