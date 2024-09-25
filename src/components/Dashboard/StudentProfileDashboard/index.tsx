import { lazy, useState, useContext } from "react";
import ApiContext from "../../../store/context";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
// import FeePaymentForm from "../../Services/FeePayment";

import StudentDetailsForm from "../../RegistrationBlock/Forms/StudentDetails";
import { SvgIcon } from "../../../common/SvgIcon";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const NewAdmissionForm = lazy(() => import("../../Services/NewAdmission"));
const FeePaymentForm = lazy(() => import("../../Services/FeePayment"));

function TabPanel({ children, value, index, ...other }: any) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const FeePaymentCard = ({
  feeAmount,
  dueDate,
  status,
}: {
  feeAmount: any;
  dueDate: any;
  status: any;
}) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        padding: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "95%",
        margin: "5px 0",
        minHeight: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Fee Amount */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">
            <strong>Fee Amount:</strong>
          </Typography>
          <Typography variant="body1">${feeAmount}</Typography>
        </Box>

        {/* Due Date */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1">
            <strong>Due Date:</strong>
          </Typography>
          <Typography variant="body1">{dueDate}</Typography>
        </Box>

        {/* Payment Status */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          {/* <Typography variant="body1">
            <strong>Payment Status:</strong>
          </Typography> */}
          {status === "Paid" ? (
            <Typography
              variant="body1"
              sx={{
                color: "green",
                fontWeight: 600,
              }}
            >
              Paid
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: "20px",
                background: "#ef006e",
              }}
              onClick={() => alert("Redirect to payment")}
            >
              Pay Now
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
};

const StudentProfileDashboard = ({ student }: any) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const ctx = useContext(ApiContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small (mobile)

  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

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
        <Box
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

        <NewAdmissionForm />

        {/* This Second block is for Fee Details */}
        {/* <FeePaymentCard feeAmount={500} dueDate="30-Sep-2024" status="Paid" />
        <FeePaymentCard feeAmount={800} dueDate="10-Oct-2024" status="Unpaid" />
        <FeePaymentCard feeAmount={500} dueDate="30-Sep-2024" status="Paid" />
        <FeePaymentCard feeAmount={800} dueDate="10-Oct-2024" status="Unpaid" />
        <FeePaymentCard feeAmount={500} dueDate="30-Sep-2024" status="Paid" />
        <FeePaymentCard feeAmount={800} dueDate="10-Oct-2024" status="Unpaid" />
        <FeePaymentCard feeAmount={500} dueDate="30-Sep-2024" status="Paid" />
        <FeePaymentCard feeAmount={800} dueDate="10-Oct-2024" status="Unpaid" /> */}
      </Box>
    </>
    // <Card sx={{ height: "100%" }}>
    //   <CardContent>
    //     {/* <Box display="flex" alignItems="center" marginBottom="20px">
    //       <Avatar
    //         src={student.photo}
    //         alt={student.name}
    //         sx={{ width: 100, height: 100, marginRight: "20px" }}
    //       />
    //       <Typography variant="h4">{student.name}</Typography>
    //     </Box> */}

    //     {/* Tabs for Navigation */}
    //     <Box
    //       sx={{
    //         borderBottom: 1,
    //         borderColor: "divider",
    //         overflowX: isMobile ? "scroll" : "auto",
    //       }}
    //     >
    //       <Tabs
    //         value={tabValue}
    //         onChange={handleChange}
    //         aria-label="student tabs"
    //         variant={isMobile ? "scrollable" : "fullWidth"}
    //         scrollButtons={isMobile ? "auto" : false} // Enable scroll buttons on mobile
    //         allowScrollButtonsMobile={isMobile} // Allow scrolling on mobile
    //       >
    //         {/* <Tab label="Student Details" /> */}
    //         <Tab label="Apply for Admission" />
    //         <Tab label="Fee Payment" />
    //       </Tabs>
    //     </Box>

    //     {/* Tab Panels */}
    //     {/* <TabPanel value={tabValue} index={0}>

    //       <PerfectScrollbar style={{ maxHeight: "400px" }}>
    //         <Typography variant="h6">Student Details</Typography>
    //       </PerfectScrollbar>
    //     </TabPanel> */}

    //     <TabPanel value={tabValue} index={1}>
    //       <PerfectScrollbar style={{ maxHeight: "400px" }}>
    //         <NewAdmissionForm />
    //       </PerfectScrollbar>
    //     </TabPanel>

    //     <TabPanel value={tabValue} index={2}>
    //       <PerfectScrollbar style={{ maxHeight: "400px" }}>
    //         <FeePaymentForm />
    //       </PerfectScrollbar>
    //     </TabPanel>
    //   </CardContent>
    // </Card>
  );
};

export default StudentProfileDashboard;
