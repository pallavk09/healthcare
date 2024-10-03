import { Box, Container, Paper, Typography } from "@mui/material";
import React from "react";
import { SvgIcon } from "../../common/SvgIcon";
import NewAdmissionForm from "../../components/Services/NewAdmission";
import AdmissionDashboard from "./admissionDashboard";

const NewAdmissionform = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, position: "relative" }}> */}
      {/* <NewAdmissionForm /> */}
      <AdmissionDashboard />
      {/* </Paper> */}
    </Container>
  );
};

export default NewAdmissionform;
