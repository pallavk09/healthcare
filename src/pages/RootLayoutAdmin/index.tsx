import MyCustomHeader from "../../components/MyCustomHeader";
import FooterLogin from "../../components/FooterLogin";
import { useNavigation, Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const RootLayoutAdmin = () => {
  const navigation = useNavigation();
  return (
    <>
      <MyCustomHeader />
      {/* {navigation.state === "loading" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(234, 32, 32, 0.7)",
            zIndex: 999,
          }}
        >
          <CircularProgress />
        </div>
      )} */}
      <Outlet />
      {/* <FooterLogin /> */}
    </>
  );
};

export default RootLayoutAdmin;
