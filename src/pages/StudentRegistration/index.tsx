import { lazy } from "react";
// import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";
// import userDataContext from "../../store/userContext";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

const Container = lazy(() => import("../../common/Container"));
const RegistrationBlock = lazy(
  () => import("../../components/RegistrationBlock")
);

const StudentRegistration = () => {
  return (
    <>
      <Container>
        <RegistrationBlock />
      </Container>
      <FooterLogin />
    </>
  );
};

export default StudentRegistration;
