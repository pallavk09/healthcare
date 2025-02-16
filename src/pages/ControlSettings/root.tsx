// import { lazy } from "react";
import React, { useEffect, useState } from "react";
import { Typography, Grid, Button, styled, Box } from "@mui/material";
import { Divider, Paper } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

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

const Root: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;
