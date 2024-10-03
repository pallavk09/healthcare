import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = ["Submitted", "Interview", "Admission"];

export default function ApplicationStepper({
  activeStep,
}: {
  activeStep: number;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step
            key={label}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#00c9a6", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                {
                  color: "#2E186A", // Just text label (COMPLETED)
                  fontWeight: "Bold",
                },
              "& .MuiStepLabel-root .Mui-active": {
                color: "rgb(255, 130, 92)", // circle color (ACTIVE)
              },
            }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
