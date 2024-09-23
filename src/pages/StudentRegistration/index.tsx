import { lazy } from "react";
import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";

const Container = lazy(() => import("../../common/Container"));
const RegistrationBlock = lazy(
  () => import("../../components/RegistrationBlock")
);

const StudentRegistration = () => {
  return (
    <>
      <HeaderLogin />
      <Container>
        <RegistrationBlock />
      </Container>
      <FooterLogin />
    </>
  );
};

export default StudentRegistration;
