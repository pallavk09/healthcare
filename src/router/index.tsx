import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../common/ProtectedRoute";

// import { Loader as StudentDashboardLoader } from "../pages/StudentDashboard";
// import { Loader as RegistrationLoader } from "../components/RegistrationBlock";
// import { Loader as AdmissionDashboardLoader } from "../pages/NewAdmissionForm/admissionDashboard";
// import SchoolAdmin from "../pages/home";
// import NewAdmission from "../pages/NewAdmission";
// import NewAdmissionform from "../pages/NewAdmissionForm/container";
// import AdmissionDetails from "../pages/AdmissionDetails";
import FeePaymentsScreen from "../pages/FeePaymentsScreen";
// import FeesOverView from "../pages/StudentFees/FeesOverView";
// import StudentDashboardHome from "../pages/StudentDashboardHome";
// import Payment from "../pages/StudentFees/Payment";
// import FeesPaymentCart from "../pages/PaymentCart/FeesPaymentCart";
import StudentAdminData from "../pages/StudentsManagement/StudentAdminData";
import RootLayoutAdmin from "../pages/RootLayoutAdmin";
import TeachersAdminData from "../pages/StaffManagement/Teachers/TeachersAdminData";
import ControlSettingsHome from "../pages/ControlSettings/Home";
import Root from "../pages/ControlSettings/root";

import StudentManagementHome from "../pages/StudentsManagement/Home";
import StudentManagementRoot from "../pages/StudentsManagement/Root";
import ManageAttendance from "../pages/StudentsManagement/ManageAttendance";
import ManageMarks from "../pages/StudentsManagement/ManageMarks";
import ExamsManagementRoot from "../pages/ExamsManagement/Root";
import ExamsManagementHome from "../pages/ExamsManagement/Home";
import AddExams from "../pages/ExamsManagement/AddExams";
import ScheduleExam from "../pages/ExamsManagement/ScheduleExam";
import StaffManagementRoot from "../pages/StaffManagement/Root";
import StaffManagementHome from "../pages/StaffManagement/Home";
import TeacherSubjectAssignment from "../pages/StaffManagement/Teachers/TeacherSubjectAssignment";
import SchoolAdmin from "../pages/SchoolAdmin";
import GetAdmitCard from "../pages/ExamsManagement/GetAdmitCard";
import { getCurrentUser } from "../service/authService";

const Login = lazy(() => import("../pages/Login"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const ManageSubjects = lazy(
  () => import("../pages/ControlSettings/ManageSubjects")
);
const ManageTransport = lazy(
  () => import("../pages/ControlSettings/ManageTransport")
);
const ManageFeeHeads = lazy(
  () => import("../pages/ControlSettings/ManageFeeHeads")
);
const user = getCurrentUser();
const myRouter = createBrowserRouter([
  {
    path: "/",
    element: user ? (
      <Navigate to="/home" replace />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    path: "/login",
    element: user ? <Navigate to="/home" replace /> : <Login />, // Redirect if logged in
  },
  {
    path: "home",
    element: <RootLayoutAdmin />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          // <SchoolAdmin />
          <ProtectedRoute allowedRoles={["admin", "teacher", "student"]}>
            <SchoolAdmin />
          </ProtectedRoute>
        ),
      },
      {
        path: "students-management",
        element: <StudentManagementRoot />,
        children: [
          { index: true, element: <StudentManagementHome /> },
          {
            path: "all-student-data",
            element: <StudentAdminData />,
          },
          {
            path: "manage-attendance",
            element: <ManageAttendance />,
          },
          {
            path: "manage-marks",
            element: <ManageMarks />,
          },
        ],
      },
      {
        path: "exams-management",
        element: <ExamsManagementRoot />,
        children: [
          { index: true, element: <ExamsManagementHome /> },
          {
            path: "add-exams",
            element: <AddExams />,
          },
          {
            path: "schedule-exam",
            element: <ScheduleExam />,
          },
          {
            path: "get-admit-card",
            element: <GetAdmitCard />,
          },
        ],
      },
      {
        path: "staff-management",
        element: <StaffManagementRoot />,
        children: [
          { index: true, element: <StaffManagementHome /> },
          {
            path: "all-teacher-data",
            element: <TeachersAdminData />,
          },
          {
            path: "teacher-class-assignment",
            element: <TeacherSubjectAssignment />,
          },
        ],
      },

      {
        path: "fees-details",
        element: <FeePaymentsScreen />,
      },
      {
        path: "controls-settings",
        element: <Root />,
        children: [
          { index: true, element: <ControlSettingsHome /> },
          {
            path: "manage-subjects",
            element: <ManageSubjects />,
          },

          {
            path: "manage-fee-heads",
            element: <ManageFeeHeads />,
          },
          {
            path: "manage-transport",
            element: <ManageTransport />,
          },
        ],
      },
    ],
  },
  // {
  //   path: "admission-details",
  //   element: <AdmissionDetails />,
  // },
  // {
  //   path: "fees-details",
  //   element: <FeePaymentsScreen />,
  // },
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
