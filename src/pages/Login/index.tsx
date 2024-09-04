import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const FormBlock = lazy(() => import("../../components/FormBlock"));

const Login = () => {
  return (
    <Container>
      <FormBlock icon="waving.svg" id="loginform" direction="left" />
    </Container>
  );
};

export default Login;
