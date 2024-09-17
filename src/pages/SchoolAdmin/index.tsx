// import { lazy } from "react";
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  SvgIcon,
  styled,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School"; // MUI Icon
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"; // MUI Icon
import { useNavigate } from "react-router-dom";

// const Container = lazy(() => import("../../common/Container"));

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "1rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const SchoolAdmin: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };
  return (
    <Grid
      container
      spacing={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }} // Full screen center alignment
    >
      {/* Card 1: Summary of New Admission Requests */}
      <Grid
        item
        xs={12}
        sm={6}
        md={4} // On larger screens, each card will take 50% of the width, centered
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          onClick={() => handleCardClick("/admission-details")}
          style={{
            cursor: "pointer",
            textAlign: "center",
            padding: "2rem",
            minWidth: "300px",
          }}
        >
          <CardContent>
            {/* Admission Icon */}
            <SvgIcon
              component={SchoolIcon}
              style={{ fontSize: 60, color: "#3f51b5" }}
            />
            <Typography
              variant="h5"
              // component="div"
              style={{ marginTop: "1rem" }}
            >
              New Admission Requests
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "0.5rem" }}
            >
              View and manage student admission requests.
            </Typography>
            <MyCustomButton variant="contained" color="primary">
              View Details
            </MyCustomButton>
          </CardContent>
        </Card>
      </Grid>

      {/* Card 2: Summary of Fees Payments */}
      <Grid
        item
        xs={12}
        sm={6}
        md={4} // On larger screens, each card will take 50% of the width, centered
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          onClick={() => handleCardClick("/fees-details")}
          style={{
            cursor: "pointer",
            textAlign: "center",
            padding: "2rem",
            minWidth: "300px",
          }}
        >
          <CardContent>
            {/* Fees Icon */}
            <SvgIcon
              component={MonetizationOnIcon}
              style={{ fontSize: 60, color: "#4caf50" }}
            />
            <Typography
              variant="h5"
              // component="div"
              style={{ marginTop: "1rem" }}
            >
              Fees Payments
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              style={{ marginTop: "0.5rem" }}
            >
              Review fee payments and pending amounts.
            </Typography>
            <MyCustomButton variant="contained" color="primary">
              View Details
            </MyCustomButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    // <Container>
    //   <h2>School Admin Page</h2>
    // </Container>
  );
};

export default SchoolAdmin;
