import { Box, Grid } from "@mui/material";
import "react-perfect-scrollbar/dist/css/styles.css";
import SubwayIcon from "@mui/icons-material/Subway";
import ExploreIcon from "@mui/icons-material/Explore";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";

// import FeePaymentCard from "../../../common/FeePaymentCard";
import StyledCard from "../../../common/Cards/Card";

const StudentProfileDashboard = ({
  userId,
  phone,
}: {
  userId: string;
  phone: string;
}) => {
  const navigate = useNavigate();
  const NavigateToFeesScreen = () => {
    console.log("Vew Fees Page clicked");
    navigate("feespaymentsummary");
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"row"}
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
        <Grid alignItems="center" justifyContent="center">
          {/* <Grid style={{ margin: 20 }}>
            <Typography variant="h6">
              <strong>Services</strong>
            </Typography>
          </Grid> */}
          {/* <Grid style={{ margin: 20 }}>
            <Typography>change the screen size to see the effect!</Typography>
          </Grid>

          <Typography variant="h6">
            <strong>
              Hidde icon on breakpoints sm (between 600px - 960px)
            </strong>
          </Typography> */}
          {/* <Divider style={{ margin: 20 }} /> */}
          <Grid container item xs={12} justifyContent="center">
            <Grid container item sm={6}>
              <Grid container item style={{ marginBottom: 20 }}>
                <StyledCard
                  buttonName="My Payments"
                  onClick={NavigateToFeesScreen}
                  caption="Manage and view your fees payments"
                  title="Fees Payment"
                  color="linear-gradient(60deg, rgba(94,53,177,1) 0%, rgba(3,155,229,1) 100%)"
                  iconPerformance={DonutSmallIcon}
                />
              </Grid>
              <Grid container style={{ marginBottom: 20 }} item>
                <StyledCard
                  title="Schedules"
                  caption="View all upcoming exam and test schedules"
                  buttonName="View Schedules"
                  onClick={NavigateToFeesScreen}
                  color="linear-gradient(60deg, rgba(245,0,87,1) 0%, rgba(255,138,128,1) 100%)"
                  iconPerformance={AssessmentIcon}
                />
              </Grid>
            </Grid>
            <Grid container item sm={6}>
              <Grid container item style={{ marginBottom: 20 }}>
                <StyledCard
                  buttonName="View Report"
                  onClick={NavigateToFeesScreen}
                  caption="View your presence and absence record"
                  title="Attendance"
                  color="linear-gradient(60deg, rgba(251,140,0,1) 0%, rgba(255,202,41,1) 100%)"
                  iconPerformance={ExploreIcon}
                />
              </Grid>

              <Grid container item style={{ marginBottom: 20 }}>
                <StyledCard
                  buttonName="View Details"
                  onClick={NavigateToFeesScreen}
                  caption="Manage and view your fees payments"
                  title="Fees Payment"
                  color="linear-gradient(60deg, rgba(67,160,71,1) 0%, rgba(255,235,59,1) 100%)"
                  iconPerformance={SubwayIcon}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

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
        {/* <FeePaymentCard
          feeAmount={500}
          dueDate="30-Sep-2024"
          paymentDate="01-Aug-2024"
          status="Paid"
        /> */}
      </Box>
    </>
  );
};

export default StudentProfileDashboard;
