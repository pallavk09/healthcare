import * as React from "react";
import { Box } from "@mui/material";
import TopStepper from "../TopStepper";
import { Fade } from "react-awesome-reveal";
import { ContentSection } from "./styles";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../common/Button";
import { StudentRegistrationForms as steps } from "../../Config/config";
import ApiContext from "../../store/context";
import { studentData } from "../../common/types";
import { v4 as uuid } from "uuid";

import StudentDetailsForm from "./Forms/StudentDetails";
import GuardianDetails from "./Forms/GuardianDetails";
import AcademicsDetails from "./Forms/AcademicsDetails";
import SummaryPage from "./Forms/SummaryPage";

const RegistrationBlock = () => {
  const ctx = React.useContext(ApiContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [studentDataState, SetStudentDataState] =
    React.useState<studentData | null>(null);
  const navigate = useNavigate();

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
  const onSubmit = (data: any) => {
    if (activeStep === steps.length - 1) {
      console.log("Final form submission data:", data);
      const unique_id = uuid();
      const studentData = { ...studentDataState, id: unique_id };
      ctx?.dispatch({
        type: "SAVE_STUDENT_DATA",
        payload: studentData as studentData,
      });
      navigate("/studentDashboard");
    } else {
      handleNext(); // Go to next step
    }
  };

  const handleNext = async () => {
    const isValid = await trigger(); // Validate current step before moving
    if (isValid) {
      if (activeStep === steps.length - 2) {
        console.log("Review and Submit screen. Show summary");
        const values = methods.getValues();
        console.log("Form Values: ", values);
        SetStudentDataState(values as studentData);
        //Check if this student already exist
        // if (
        //   ctx?.state?.studentMasterData &&
        //   ctx?.state?.studentMasterData.length > 0
        // ) {
        //   const findStudent = ctx?.state?.studentMasterData.findIndex(
        //     (student) => student.id === values.id
        //   );

        //   if (findStudent === -1) {
        //     //New Student
        //   } else {
        //     //existing student
        //   }
        // }
        // if (!Object.keys(values).includes("id")) {
        //   const unique_id = uuid();
        //   const studentData = { ...values, id: unique_id };
        //   ctx?.dispatch({
        //     type: "SAVE_STUDENT_DATA",
        //     payload: studentData as studentData,
        //   });
        // } else {
        //   // Save data in context
        //   ctx?.dispatch({
        //     type: "SAVE_STUDENT_DATA",
        //     payload: values as studentData,
        //   });
        // }
      }
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    console.log("Handle Back: ");
    setActiveStep((previousStep) => previousStep - 1);
  };
  // const handleNext = (e: any) => {
  //   // e.preventDefault();
  //   methods.trigger();
  //   console.log("Inside Handle Next");
  //   console.log(methods.getValues());
  //   const hasEmptyValues = hasUndefinedNullOrEmptyValue(methods.getValues());
  //   if (!hasEmptyValues) {
  //     if (activeStep < steps.length - 1)
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);

  //     if (activeStep === steps.length - 2) {
  //       console.log("Review and Submit screen. Show summary");
  //       const values = methods.getValues();
  //       console.log("Form Values: ", values);

  //       //Generate Unique ID and update object
  //       const unique_id = uuid();
  //       const studentData = { ...values, id: unique_id };

  //       //Save data in context
  //       ctx?.dispatch({
  //         type: "SAVE_STUDENT_DATA",
  //         payload: studentData as studentData,
  //       });
  //     }

  //     // if (activeStep === steps.length - 1) {
  //     //   console.log("Clicked on Save. Navigate to dashboard");

  //     //   navigate("/studentDashboard");
  //     // }
  //   } else {
  //     console.log("Mandatory fields are empty");
  //   }
  // };

  // const hasUndefinedNullOrEmptyValue = (obj: Record<string, any>): boolean => {
  //   return Object.values(obj).some(
  //     (value) => value === undefined || value === null || value === ""
  //   );
  // };

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
                    <Button onClick={handleBack} max_width="100px">
                      Previous
                    </Button>
                  )}
                  <Button type="submit" max_width="100px">
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>

                  {/* <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    max_width="100px"
                  >
                    Back
                  </Button>
                  <Button onClick={handleNext} max_width="100px">
                    {activeStep === steps.length - 1 ? "Save" : "Next"}
                  </Button> */}
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </ContentSection>
  );
};

export default RegistrationBlock;
