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
} from "@mui/material";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
// import FeePaymentForm from "../../Services/FeePayment";

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

const StudentProfileDashboard = ({ student }: any) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const ctx = useContext(ApiContext);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small (mobile)

  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  // Component to display the tab content

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        {/* <Box display="flex" alignItems="center" marginBottom="20px">
          <Avatar
            src={student.photo}
            alt={student.name}
            sx={{ width: 100, height: 100, marginRight: "20px" }}
          />
          <Typography variant="h4">{student.name}</Typography>
        </Box> */}

        {/* Tabs for Navigation */}
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            overflowX: isMobile ? "scroll" : "auto",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="student tabs"
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false} // Enable scroll buttons on mobile
            allowScrollButtonsMobile={isMobile} // Allow scrolling on mobile
          >
            <Tab label="Student Details" />
            <Tab label="Apply for Admission" />
            <Tab label="Fee Payment" />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          {/* Scrollable Student Details */}
          <PerfectScrollbar style={{ maxHeight: "400px" }}>
            <Typography variant="h6">Student Details</Typography>
          </PerfectScrollbar>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <PerfectScrollbar style={{ maxHeight: "400px" }}>
            <NewAdmissionForm />
          </PerfectScrollbar>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <PerfectScrollbar style={{ maxHeight: "400px" }}>
            <FeePaymentForm />
          </PerfectScrollbar>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default StudentProfileDashboard;
