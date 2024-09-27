import * as React from "react";
import { useEffect } from "react";
import { Box, styled, Button, CircularProgress } from "@mui/material";
import TopStepper from "../TopStepper";
import { Fade } from "react-awesome-reveal";
import { ContentSection } from "./styles";
import { json, useNavigate, useParams, useLoaderData } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
// import { Button } from "../../common/Button";
import { StudentRegistrationForms as steps } from "../../Config/config";
import ApiContext from "../../store/context";
import { studentData, userState } from "../../common/types";
import { v4 as uuid } from "uuid";

import StudentDetailsForm from "./Forms/StudentDetails";
import GuardianDetails from "./Forms/GuardianDetails";
import AcademicsDetails from "./Forms/AcademicsDetails";
import SummaryPage from "./Forms/SummaryPage";

import { FormatNewStudentPayload } from "../../helper/formatPayload";
import { CreateNewStudent } from "../../api/students";
import SuccessPopup from "../../common/SuccessPopup";
import { GetRegisteredUser } from "../../api/registration";

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "0rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

export async function Loader({ params }: { params: any }) {
  try {
    const registeredUser = await GetRegisteredUser(params.userId!);

    if (registeredUser?.user && registeredUser?.user?.length > 0) {
      return registeredUser?.user;
    } else {
      throw json({ message: "Could not fetch students" }, { status: 500 });
    }
  } catch (error: any) {
    throw json(
      { message: `Could not fetch registered user. Error${error.message}` },
      { status: 500 }
    );
  }
}

const RegistrationBlock = () => {
  const ctx = React.useContext(ApiContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [_userId, setUserId] = React.useState<string | undefined>();
  const [studentDataState, SetStudentDataState] =
    React.useState<studentData | null>(null);

  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  const params = useParams();
  const registeredUserData = useLoaderData() as any;

  console.log("Loader Data");
  console.log(JSON.stringify(registeredUserData));
  console.log("Loader Data ----- Phone");
  console.log(registeredUserData[0].phone);

  // const userObj: userState = {
  //   userId: "",
  //   phone: "",
  //   isLoggedIn: false,
  //   role: "student",
  //   otpVerified: false,
  //   siblings: [],
  // };

  const handleClosePopup = () => {
    setIsPopupOpen(false);

    //New User. Need to add students
    navigate(`/studentdashboard/${_userId}`);
  };

  useEffect(() => {
    console.log("Under useEffect of Registration block");
    const userId = params.userId;
    console.log(ctx?.state);
    // console.log(`UserID as ${userId}`);
    // console.log("Context Updated");
    // ctx?.dispatch({
    //   type: "UPDATE_USERID",
    //   payload: userId,
    // });
    setUserId(userId!);
  }, []);

  const methods = useForm({
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    control,
    // getValues,
    formState: { errors },
  } = methods;

  // Function to submit the form for the final step
  const onSubmit = async (data: any) => {
    try {
      if (activeStep === steps.length - 1) {
        setLoading(true);
        console.log("Final form submission data:", studentDataState);

        //Call API to create this student
        const _newStudent = await CreateNewStudent(studentDataState);
        if (_newStudent && _newStudent.newStudent) {
          console.log("New Student created");
          console.log(_newStudent);

          //Update context with this data
          // ctx?.dispatch({
          //   type: "ADD_NEW_STUDENT",
          //   payload: [studentDataState],
          // });

          //context updated. Show Dialog and Navigate to Dashboard
          setIsPopupOpen(true);
        } else {
          console.log("Error adding new student");
          console.log(_newStudent);
        }
      } else {
        handleNext();
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(); // Validate current step before moving
    if (isValid) {
      if (activeStep === steps.length - 2) {
        console.log("Review and Submit screen. Show summary");
        const newStudentData = methods.getValues();
        console.log("Form Values: ", newStudentData);
        const studentId = `studid${uuid()}`;
        const phone = registeredUserData[0]?.phone;
        console.log("handleNext: userId -------------> ", _userId);
        const value_Formatted = FormatNewStudentPayload(
          newStudentData,
          _userId,
          studentId,
          phone
        );
        console.log(`Formatted value`);
        console.log(value_Formatted);
        SetStudentDataState(value_Formatted as studentData);
      }
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    console.log("Handle Back: ");
    setActiveStep((previousStep) => previousStep - 1);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <StudentDetailsForm
            register={methods.register}
            control={control}
            errors={errors}
          />
        );
      case 1:
        return (
          <GuardianDetails
            register={methods.register}
            control={control}
            errors={errors}
            trigger={trigger}
          />
        );
      case 2:
        return (
          <AcademicsDetails
            register={methods.register}
            control={control}
            errors={errors}
            trigger={trigger}
          />
        );
      case 3:
        return <SummaryPage studentdata={studentDataState} />;
    }
  };
  return (
    <ContentSection>
      {/* This is Container Box */}
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "75vh",
          margin: "auto",
        }}
      >
        {/* This is Box for stepper */}
        <Box
          sx={{
            width: "15vw",
            backgroundColor: "#f9f9f9",
            boxShadow: 3,
            borderRadius: 2,
          }}
        >
          <TopStepper steps={steps} activeStep={activeStep} />
        </Box>
        {/* This is Box for Forms and Button */}
        <Box
          sx={{
            width: "90vw",
            padding: 3,
            paddingBottom: 0,
          }}
        >
          <FormProvider {...methods}>
            <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                gap={3}
                height={"100%"}
              >
                {/* This is Form container Box*/}
                <Box
                  sx={{
                    width: "80%",
                    height: "95%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* This block is for showing form based on activestep number */}
                  <Fade direction={"right"} triggerOnce>
                    {getStepContent(activeStep)}
                  </Fade>
                </Box>
                {/* This is buttons container box*/}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:
                      activeStep === 0 ? "right" : "space-between",
                    width: "80%",
                    // height: "10%",
                  }}
                >
                  {activeStep > 0 && (
                    <MyCustomButton
                      type="button"
                      color="primary"
                      variant="contained"
                      onClick={handleBack}
                    >
                      Previous
                    </MyCustomButton>
                  )}
                  <MyCustomButton
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {activeStep === steps.length - 1 && loading && "WAIT..."}
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </MyCustomButton>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
      <SuccessPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        title="Student Added Successfully"
        message="Go to My Dashboard to manage you details and Services"
        buttonText="View My Dashboard"
      />
    </ContentSection>
  );
};

export default RegistrationBlock;
