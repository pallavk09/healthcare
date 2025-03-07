// ProtectedRoute.js
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../service/authService";

interface ProtectedRouteProps {
  children: ReactNode; // Accepts any valid React node
  allowedRoles: string[];
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const user = getCurrentUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

// import React, { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   return !!token; // If token exists, user is authenticated
// };

// interface ProtectedRouteProps {
//   children: ReactNode; // Accepts any valid React node
// }

// //The component returns {children} wrapped in a fragment (<>...</>) instead of directly returning children. This helps ensure that the return type is a valid React node
// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const location = useLocation();
//   const loginRoute = location.pathname.startsWith("/newadmission")
//     ? "/newadmission"
//     : "/student";

//   if (!isAuthenticated()) {
//     return <Navigate to={loginRoute} replace />;
//   }
//   return <>{children}</>;
// };

// export default ProtectedRoute;
