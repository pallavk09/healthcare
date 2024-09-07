import { lazy } from "react";

const Container = lazy(() => import("../../common/Container"));
const RegistrationBlock = lazy(
  () => import("../../components/RegistrationBlock")
);

const StudentRegistration = () => {
  return (
    <Container>
      <RegistrationBlock />
    </Container>
  );
};

export default StudentRegistration;
