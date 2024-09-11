import { useState } from "react";
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
import AdmissionAndPaymentForm from "../../NewAdmission";

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

const StudentRegistrationSummary = ({ student }: any) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
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
            {/* <Typography variant="h6">Class: {student.class}</Typography>
            <Typography variant="body1" sx={{ marginTop: "10px" }}>
              {student.details}
            </Typography> */}
            <AdmissionAndPaymentForm />
          </PerfectScrollbar>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {/* Apply for Admission Form */}
          <Typography variant="h6">Apply for Admission</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            Admission form and instructions will go here.
          </Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          {/* Fee Payment Details */}
          <Typography variant="h6">Fee Payment</Typography>
          <Typography variant="body1" sx={{ marginTop: "10px" }}>
            Fee payment details and options will go here.
          </Typography>
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default StudentRegistrationSummary;
