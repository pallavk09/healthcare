import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import routes from "./config";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

import ProtectedRoute from "../common/ProtectedRoute";

import { Loader as StudentDashboardLoader } from "../pages/StudentDashboard";
import { Loader as RegistrationLoader } from "../components/RegistrationBlock";

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
