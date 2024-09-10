import * as React from "react";
import { Box, Button } from "@mui/material";
import TopStepper from "../TopStepper";
import { Fade } from "react-awesome-reveal";

import { ContentSection } from "./styles";
import StudentDetailsForm from "./Forms/StudentDetails";
import GuardianDetails from "./Forms/GuardianDetails";
import AcademicsDetails from "./Forms/AcademicsDetails";
import SummaryPage from "./Forms/SummaryPage";

import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

const RegistrationBlock = () => {
  const steps = ["Personal Info", "Guardian Info", "Academics", "Save"];
  const [activeStep, setActiveStep] = React.useState(0);
  const [registrationDetails, setRegistrationDetails] = React.useState({});
  const navigate = useNavigate();
  const methods = useForm();

  const formArray = [
    <StudentDetailsForm />,
    <GuardianDetails />,
    <AcademicsDetails />,
    <SummaryPage registrationDetails={registrationDetails} />,
  ];

  const handleBack = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };
  const handleNext = (e: any) => {
    e.preventDefault();
    methods.trigger();
    const hasEmptyValues = hasUndefinedNullOrEmptyValue(methods.getValues());
    if (!hasEmptyValues) {
      if (activeStep < steps.length - 1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

      if (activeStep === steps.length - 2) {
        console.log("Review and Submit screen. Show summary");
        const values = methods.getValues();
        console.log("Form Values: ", values);
        setRegistrationDetails(values);
      }

      if (activeStep === steps.length - 1) {
        console.log("Clicked on Save. Navigate to dashboard");

        // navigate("/studentDashboard");
      }
    } else {
      console.log("Mandatory fields are empty");
    }
  };

  const hasUndefinedNullOrEmptyValue = (obj: Record<string, any>): boolean => {
    return Object.values(obj).some(
      (value) => value === undefined || value === null || value === ""
    );
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
            width: "15%",
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
            width: "80%",
            padding: 3,
            paddingBottom: 0,
          }}
        >
          <FormProvider {...methods}>
            <form method="POST" style={{ height: "100%" }}>
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
                    {formArray[activeStep]}
                  </Fade>
                </Box>
                {/* This is buttons container box*/}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                    // height: "10%",
                  }}
                >
                  <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    // sx={{ mr: 0 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    // sx={{ mr: "2rem" }}
                  >
                    {activeStep === steps.length - 1 ? "Save" : "Next"}
                  </Button>
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
