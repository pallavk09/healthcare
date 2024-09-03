import { Suspense, lazy } from "react";
import { Styles } from "../styles/styles";
import { Routes, Route } from "react-router-dom";
import routes from "./config";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Routes>
        {routes.map((routeItem) => {
          const LazyComponent = lazy(
            () => import(`../pages/${routeItem.component}`)
          );
          return (
            <Route
              key={routeItem.component}
              path={routeItem.path}
              element={<LazyComponent />}
            />
          );
        })}
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default Router;
