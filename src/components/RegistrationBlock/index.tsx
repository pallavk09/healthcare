import * as React from "react";
import { Box, Button } from "@mui/material";
import TopStepper from "../TopStepper";
import { Fade } from "react-awesome-reveal";

import { ContentSection } from "./styles";
import StudentDetailsForm from "./Forms/StudentDetails";
import GuardianDetails from "./Forms/GuardianDetails";
import AcademicsDetails from "./Forms/AcademicsDetails";

import { useNavigate } from "react-router-dom";

const RegistrationBlock = () => {
  const steps = ["Personal Info", "Guardian Info", "Academics", "Save"];
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const formArray = [
    <StudentDetailsForm />,
    <GuardianDetails />,
    <AcademicsDetails />,
    "This for Review and Submit page",
  ];

  const handleBack = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };
  const handleNext = () => {
    if (activeStep < steps.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    if (activeStep === steps.length - 1) {
      console.log("Review and Submit screen. Navigate to dashboard");
      navigate("/studentDashboard");
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
            width: "15%",
            backgroundColor: "#fff",
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
          }}
        >
          {/* This is Form container Box*/}
          <Box
            sx={{
              width: "60%",
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
              height: "10%",
            }}
          >
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mr: "2rem" }}
            >
              {activeStep === steps.length - 1 ? "Save" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ContentSection>
  );
};

export default RegistrationBlock;
