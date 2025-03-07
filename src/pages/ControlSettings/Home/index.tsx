// import { lazy } from "react";
import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, styled, Box } from "@mui/material";
import { Divider, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import HomeIcon from "@mui/icons-material/Home";

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2E186A",
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

const ControlSettingsHome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
      justifyContent="center"
    >
      <Typography
        variant="h3"
        sx={{
          color: "#2E186A",
        }}
        alignSelf={"center"}
        mt={2}
      >
        <strong>Control And Settings Home</strong>
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"normal"}
        p={2}
        pb={0}
      >
        <MyCustomButton
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/home")}
        >
          Home
        </MyCustomButton>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"auto"}
        height={"60vh"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          width={"30%"}
          height={"90%"}
        >
          <PaperCard
            title={"Manage Subjects"}
            caption={"Create and Manage Subjects."}
            onClick={() => navigate("manage-subjects")}
          />

          {/* <PaperCard
              title={"Credentials Manager"}
              caption={"View Fees Record. Collect Fees."}
              onClick={() => navigate("fees-details")}
            /> */}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          width={"30%"}
          height={"90%"}
        >
          <PaperCard
            title={"Manage Transport"}
            caption={"Create Manage Transport Fee"}
            onClick={() => navigate("manage-transport")}
          />
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          width={"30%"}
          height={"90%"}
        >
          <PaperCard
            title={"Manage Fee Heads"}
            caption={"Create & Manage Fee Heads"}
            onClick={() => navigate("manage-fee-heads")}
          />

          {/* <PaperCard
              title={"Control and Settings"}
              caption={"Fetch all kind of report"}
              onClick={() => navigate("controls-settings")}
            /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ControlSettingsHome;
