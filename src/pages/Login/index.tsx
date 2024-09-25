import { lazy } from "react";
import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";

const Container = lazy(() => import("../../common/Container"));
const FormBlock = lazy(() => import("../../components/FormBlock"));

const Login = () => {
  return (
    <>
      {/* <HeaderLogin /> */}
      <Container>
        <FormBlock icon="waving.svg" id="loginform" direction="left" />
      </Container>
      <FooterLogin />
    </>
  );
};

export default Login;
