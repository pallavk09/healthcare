// import { lazy, useState, useContext } from "react";
// import ApiContext from "../../../store/context";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";

import FeePaymentCard from "../../../common/FeePaymentCard";

const StudentProfileDashboard = ({ student }: any) => {
  // const theme = useTheme();
  // const ctx = useContext(ApiContext);
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        // minHeight={"95%"}
        maxHeight={"90vh"}
        width={"68vw"}
        border="1px solid #edf3f5"
        boxShadow={2}
        alignItems={"center"}
        p={2}
        sx={{
          // overflowX: "auto",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px", // Width of the scrollbar
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Background of the scrollbar track
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888", // Color of the scroll thumb
            borderRadius: "10px", // Rounded corners
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Darker color on hover for the thumb
          },
        }}
      >
        {/* This first block is for New Admission Form */}
        {/* <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          mr={10}
        >
          <SvgIcon src="dummySchoolLogo.svg" width="150px" height="150px" />
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography variant="h4">
              <strong>Maharaja Public School</strong>
            </Typography>
            <Typography variant="body2" color="#4b4a54">
              <strong>NH-30,Rewa-Satna Road, Bela Satna M.P.- 485115</strong>
            </Typography>
            <Typography variant="body2" color="#d10057">
              CBSE Affiliation No. 1030591, School code:50566, Dist Code:
              23130111812
            </Typography>
            <Typography variant="body2" color="#d10057">
              <strong>Email:</strong> founder@mosrewa.com,{" "}
              <strong>website:</strong> maharajapublicschoolbela.com
            </Typography>
            <Typography variant="h5" p={1}>
              <strong>Application for Admission</strong>
            </Typography>
            <Typography variant="body2" mt={-1}>
              Session 2024-25
            </Typography>
          </Box>
        </Box>

        <NewAdmissionForm /> */}

        {/* This Second block is for Fee Details */}
        <FeePaymentCard
          feeAmount={500}
          dueDate="30-Sep-2024"
          paymentDate="01-Aug-2024"
          status="Paid"
        />
        <FeePaymentCard
          feeAmount={800}
          dueDate="10-Oct-2024"
          paymentDate="05-Aug-2024"
          status="Unpaid"
        />
        <FeePaymentCard
          feeAmount={500}
          dueDate="30-Sep-2024"
          paymentDate="06-Aug-2024"
          status="Paid"
        />
        <FeePaymentCard
          feeAmount={800}
          dueDate="10-Oct-2024"
          paymentDate="06-Aug-2024"
          status="Unpaid"
        />
        <FeePaymentCard
          feeAmount={500}
          dueDate="30-Sep-2024"
          paymentDate="07-Aug-2024"
          status="Paid"
        />
        <FeePaymentCard
          feeAmount={800}
          dueDate="10-Oct-2024"
          paymentDate="07-Aug-2024"
          status="Unpaid"
        />
        <FeePaymentCard
          feeAmount={500}
          dueDate="30-Sep-2024"
          paymentDate="08-Aug-2024"
          status="Paid"
        />
        <FeePaymentCard
          feeAmount={800}
          dueDate="10-Oct-2024"
          paymentDate="08-Aug-2024"
          status="Unpaid"
        />
      </Box>
    </>
  );
};

export default StudentProfileDashboard;
