import { useRouteError } from "react-router-dom";
import Header from "../../components/Header";
import { Box, styled, Typography, Button } from "@mui/material";
import { SvgIcon } from "../../common/SvgIcon";

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "0rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));
const ErrorPage = () => {
  const error = useRouteError() as any;
  console.log(error);

  //Default Values
  let title = "An Error Occured";
  let message = "Something went wrong";
  return (
    <>
      <Header />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          width: "100vw",
          height: "70vh",
        }}
      >
        <SvgIcon src="pagenotfound.svg" width="75%" height="85%" />
        <Typography variant="h6" fontWeight={600}>
          {error?.data?.message || message}
        </Typography>
        {/* <MyCustomButton variant="contained" color="primary">
          GO BACK
        </MyCustomButton> */}
      </Box>
    </>
  );
};

export default ErrorPage;
