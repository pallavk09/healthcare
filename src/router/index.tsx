import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "../pages/Legals/PrivacyPolicy";
import TermsConditions from "../pages/Legals/TermsConditions";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { orange } from "@mui/material/colors";

const RootLayout = lazy(() => import("../pages/RootLayout"));
const Home = lazy(() => import("../pages/Home"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-conditions", element: <TermsConditions /> },
    ],
  },
]);
const Router = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: orange[500],
      },
    },
  });
  return (
    <Suspense fallback={null}>
      <Styles />
      <RouterProvider router={myRouter} />
    </Suspense>
    // <Suspense fallback={null}>
    //   {/* <Styles /> */}
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <RouterProvider router={myRouter} />
    //   </ThemeProvider>
    // </Suspense>
  );
};

export default Router;
