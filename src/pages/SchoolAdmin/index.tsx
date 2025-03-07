// import { lazy } from "react";
import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, styled, Box } from "@mui/material";
import { Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FooterLogin from "../../components/FooterLogin";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import moment from "moment";
import { hasPermission } from "../../service/authService";

// const Container = lazy(() => import("../../common/Container"));

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#09829d",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "1rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const PaperCard = (props: any) => {
  return (
    <>
      <Paper
        sx={{
          boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
          position: "relative",
          borderRadius: 2,
          padding: (theme) => theme.spacing(1, 2),
          width: "60%",
          margin: (theme) => theme.spacing(2),
        }}
      >
        <Grid container>
          <Grid
            container
            sx={{
              padding: (theme) => theme.spacing(1),
              // margin: (theme) => theme.spacing(1),
            }}
            flexDirection={"row"}
            justifyContent="space-between"
          >
            {/* <Diversity2Icon style={{ fontSize: "100px" }} /> */}

            <Grid
              container
              // sx={{
              //   padding: (theme) => theme.spacing(0),
              //   margin: (theme) => theme.spacing(0),
              // }}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent="flex-start"
            >
              <Typography variant="h5">
                <strong>{props.title}</strong>
              </Typography>
              <Typography variant="caption" align="left" color="text.secondary">
                {props.caption}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Divider style={{ color: "#FF825B", border: "1px solid" }} />
        {/* <Box
          width={"100%"}
          height={"5px"}
          // ml={-3}
          mt={1}
          sx={{
            background: "linear-gradient(to right, #ff825b, white)",
          }}
        /> */}

        <Grid
          container
          // xs
          justifyContent={"flex-start"}
          sx={{
            padding: (theme) => theme.spacing(0),
            margin: (theme) => theme.spacing(1, 0),
          }}
        >
          <MyCustomButton
            type="button"
            variant="contained"
            size="medium"
            endIcon={<ArrowCircleRightIcon />}
            onClick={props.onClick}
          >
            <strong>{"Proceed"}</strong>
          </MyCustomButton>
        </Grid>
      </Paper>
    </>
  );
};

const SchoolAdmin: React.FC = () => {
  const navigate = useNavigate();
  // const [quote, setQuote] = useState("");

  // useEffect(() => {
  //   fetch("https://zenquotes.io/api/random")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setQuote(data[0].q + " - " + data[0].a);
  //     });
  // }, []);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const onMyPatymentsClick = () => {
    //props.onClick();
  };
  const getGreeting = () => {
    const hour = moment().hour(); // Get current hour (0-23)

    if (hour >= 5 && hour < 12) {
      return "GOOD MORNING";
    } else if (hour >= 12 && hour < 17) {
      return "GOOD AFTERNOON";
    } else if (hour >= 17 && hour < 21) {
      return "GOOD EVENING";
    } else {
      return "GOOD NIGHT";
    }
  };
  return (
    <>
      <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <Typography
          variant="h3"
          sx={{
            color: "#2E186A",
          }}
          alignSelf={"center"}
          mt={2}
        >
          <strong>WELCOME AND {getGreeting()}</strong>
        </Typography>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"auto"}
        >
          {hasPermission("Fees Collection") &&
            hasPermission("Teachers Management") && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-end"}
                justifyContent={"flex-end"}
                width={"80%"}
              >
                <PaperCard
                  title={"Fees Collection"}
                  caption={"View Fees Record. Collect Fees."}
                  onClick={() => navigate("fees-details")}
                />
                <PaperCard
                  title={"Teachers Management"}
                  caption={"View Staff Details here."}
                  onClick={() => navigate("staff-management")}
                />
              </Box>
            )}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"80%"}
          >
            <PaperCard
              title={"Students Management"}
              caption={"View, Edit and Add Students here"}
              onClick={() => navigate("students-management")}
              // onClick={() => navigate("all-student-data")}
            />

            <PaperCard
              title={"Report Center"}
              caption={"Fetch all kind of report"}
              onClick={() => console.log("View Report Clicked")}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            width={"80%"}
          >
            <PaperCard
              title={"Exams Management"}
              caption={"View Fees Record. Collect Fees."}
              onClick={() => navigate("exams-management")}
            />

            <PaperCard
              title={"Control and Settings"}
              caption={"Fetch all kind of report"}
              onClick={() => navigate("controls-settings")}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SchoolAdmin;
