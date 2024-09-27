import { lazy } from "react";
import FooterLogin from "../../components/FooterLogin";

// import NewAdmissionBlock from "../../components/NewAdmissionBlock";

const Container = lazy(() => import("../../common/Container"));

const NewAdmissionBlock = lazy(
  () => import("../../components/NewAdmissionBlock")
);

const NewAdmission = () => {
  return (
    <>
      <Container>
        <NewAdmissionBlock
          icon="newadmission2.svg"
          id="loginform"
          direction="left"
        />
      </Container>
      <FooterLogin />
    </>
  );
};

export default NewAdmission;
