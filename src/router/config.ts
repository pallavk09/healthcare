const routes = [
  {
    path: "/",
    exact: true,
    component: "Home",
  },
  {
    path: "/login",
    exact: true,
    component: "Login",
  },
  {
    path: "/studentregistration",
    exact: true,
    component: "StudentRegistration",
  },
  {
    path: "/studentdashboard",
    exact: true,
    component: "StudentDashboard",
  },
  {
    path: "/schooladmin",
    exact: true,
    component: "SchoolAdmin",
  },
  {
    path: "/admission-details",
    exact: true,
    component: "AdmissionDetails",
  },
  {
    path: "/fees-details",
    exact: true,
    component: "FeePaymentsScreen",
  },
];

export default routes;
