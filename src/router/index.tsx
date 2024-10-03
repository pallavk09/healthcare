import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "../common/ProtectedRoute";

// import { Loader as StudentDashboardLoader } from "../pages/StudentDashboard";
// import { Loader as RegistrationLoader } from "../components/RegistrationBlock";
// import { Loader as AdmissionDashboardLoader } from "../pages/NewAdmissionForm/admissionDashboard";
import SchoolAdmin from "../pages/SchoolAdmin";
import NewAdmission from "../pages/NewAdmission";
// import NewAdmissionform from "../pages/NewAdmissionForm/container";
import AdmissionDetails from "../pages/AdmissionDetails";
import FeePaymentsScreen from "../pages/FeePaymentsScreen";

const RootLayout = lazy(() => import("../pages/RootLayout"));
const StudentRootLayout = lazy(() => import("../pages/StudentRootLayout"));
const NewAdmissionRootLayout = lazy(
  () => import("../pages/NewAdmissionRootLayout")
);
const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Studentregistration = lazy(() => import("../pages/StudentRegistration"));
const StudentDashboard = lazy(() => import("../pages/StudentDashboard"));
const AdmissionDashboard = lazy(
  () => import("../pages/NewAdmissionForm/admissionDashboard")
);
const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "newadmission",
        element: <NewAdmissionRootLayout />,
        children: [
          { index: true, element: <NewAdmission /> },
          {
            path: "apply/:userId",
            element: <AdmissionDashboard />,
            // loader: AdmissionDashboardLoader,
          },
        ],
      },
      {
        path: "student",
        element: <StudentRootLayout />,
        children: [
          { index: true, element: <Login /> },
          {
            path: "studentregistration/:userId",
            element: (
              <ProtectedRoute>
                <Studentregistration />
              </ProtectedRoute>
            ),
            // loader: RegistrationLoader,
          },
          {
            path: "studentdashboard/:userId",
            element: (
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            ),
            // loader: StudentDashboardLoader,
          },
        ],
      },
      {
        path: "schooladmin",
        element: <SchoolAdmin />,
        children: [
          {
            path: "admission-details",
            element: <AdmissionDetails />,
          },
          {
            path: "fees-details",
            element: <FeePaymentsScreen />,
          },
        ],
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
