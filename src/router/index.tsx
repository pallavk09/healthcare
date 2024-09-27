import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "../common/ProtectedRoute";

import { Loader as StudentDashboardLoader } from "../pages/StudentDashboard";
import { Loader as RegistrationLoader } from "../components/RegistrationBlock";
import SchoolAdmin from "../pages/SchoolAdmin";
import NewAdmission from "../pages/NewAdmission";

const RootLayout = lazy(() => import("../pages/RootLayout"));
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Studentregistration = lazy(() => import("../pages/StudentRegistration"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard"));
const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "newadmission",
        element: <NewAdmission />,
        children: [
          {
            path: "apply/:userId",
            element: "",
          },
          {
            path: "trackmyapplication/:userId",
            element: "",
          },
        ],
      },
      { path: "login", element: <Login /> },
      {
        path: "studentregistration/:userId",
        element: (
          <ProtectedRoute>
            <Studentregistration />
          </ProtectedRoute>
        ),
        loader: RegistrationLoader,
      },
      {
        path: "studentdashboard/:userId",
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ),
        loader: StudentDashboardLoader,
      },
      {
        path: "schooladmin/",
        element: <SchoolAdmin />,
      },
    ],
  },
]);
const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <RouterProvider router={myRouter} />
    </Suspense>
  );
};

export default Router;
