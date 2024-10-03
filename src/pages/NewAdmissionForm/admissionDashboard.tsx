import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  SvgIcon,
  Dialog,
  DialogContent,
  Container,
  Avatar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewAdmissionForm from "../../components/Services/NewAdmission";
import newadmissionContext, {
  newAddmissionApplicationType,
} from "../../store/newadmissionContext";
import { ListApplications } from "../../api/newAdmission";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import { MyCustomButton } from "../../common/MyCustomControls";
import ApplicationStepper from "../../components/ApplicationStepper";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

import userDataContext from "../../store/userContext";
import { jwtDecode } from "jwt-decode";
import { GeneratePrevieUrl } from "../../common/utils/generatePreviewUrl";

// export async function Loader({ params }: { params: any }) {
//   try {
//     console.log(`params.userId!: ${params.userId!}`);
//     const applicationList = await ListApplications(params.userId!);
//     if (applicationList?.result && applicationList?.result.length > 0) {
//       return applicationList?.result;
//     } else {
//       console.log("Admission dashboard Loader. Returning []");
//       return [];
//     }
//   } catch (error: any) {
//     throw json(
//       { message: `Could not fetch application list. Error${error.message}` },
//       { status: 500 }
//     );
//   }
// }

const AdmissionDashboard = () => {
  // const loaderData = useLoaderData() as newAddmissionApplicationType[];
  const [isOpen, setIsOpen] = useState(false);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [applications, setApplications] = useState<
    newAddmissionApplicationType[] | []
  >();
  const navigate = useNavigate();
  const snackbarRef = useRef<SnackbarHandle>(null);

  // const ctx = useContext(newadmissionContext);
  const ctx_userData = useContext(userDataContext);

  const onClose = () => {
    console.log("Dialog Closed");
    setIsOpen(false);
  };

  // const GeneratePrevieUrl = (document_id: string) => {
  //   return `${process.env.REACT_APP_APPWRITE_ENDPOINT}/storage/buckets/${process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID}/files/${document_id}/preview?project=${process.env.REACT_APP_APPWRITE_PROJECT_ID}`;
  // };

  useEffect(() => {
    console.log("Under useEffect of AdmissionDashboard.");
    console.log(ctx_userData?.user_state);
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);
    if (ctx_userData?.user_state.phone && ctx_userData?.user_state.userId) {
      console.log("Phone and userId already present in context");
      setPhone(ctx_userData?.user_state.phone);
      setUserId(ctx_userData?.user_state.userId);
    } else if (accessToken) {
      console.log("Phone and userId not there in context");
      console.log("Token found. Updating context");
      const accessToken_decode = jwtDecode(accessToken) as {
        phone: string;
        userId: string;
      };
      console.log("Token found. Decoded");
      console.log(accessToken_decode);
      setPhone(accessToken_decode.phone);
      setUserId(accessToken_decode.userId);

      ctx_userData?.user_dispatch({
        type: "UPDATE_USER_LOGGEDIN",
        payload: {
          phone: accessToken_decode.phone,
          userId: accessToken_decode.userId,
        },
      });

      const LoadApplications = async (userId: string) => {
        try {
          console.log(`Calling ListApplications. userId!: ${userId}`);
          const applicationList = await ListApplications(userId!);
          if (applicationList?.result && applicationList?.result.length > 0) {
            console.log("Application List");
            console.log(applicationList?.result);
            setApplications(applicationList?.result);
          } else {
            setApplications([]);
          }
        } catch (error: any) {
          snackbarRef.current?.showSnackbar(
            `Error while fetching data ${error.message}`,
            "error"
          );
        }
      };

      LoadApplications(accessToken_decode.userId);
    } else {
      console.log("Token not found. Logging out");
      navigate("/newadmission");
    }
  }, []);

  const getCardsList = (applicationArray: newAddmissionApplicationType[]) => {
    return applicationArray.map(
      (application: newAddmissionApplicationType, index: any) => {
        if (application.applicationId) {
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              style={{ display: "flex", justifyContent: "center" }}
              key={index}
            >
              <Card
                raised={true}
                // onClick={() => setIsOpen(true)}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    gap={1}
                    // bgcolor={"green"}
                    height={"100%"}
                    width={"100%"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"flex-start"}
                      height={"100%"}
                      width={"100%"}
                    >
                      <Avatar
                        src={
                          application?.photoUrl
                            ? GeneratePrevieUrl(application.photoUrl)
                            : ""
                        }
                        alt="Student Photo"
                        sx={{
                          width: "100px",
                          height: "110px",
                          objectFit: "contain",
                        }}
                        variant="square"
                      />
                      {/**This is details typography Box */}
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"left"}
                        // bgcolor={"yellow"}
                        p={"0 .5rem"}
                        gap={0.1}
                      >
                        <Box sx={{ flex: 0 }} textAlign={"left"}>
                          <Typography variant="body1" display={"inline"}>
                            <strong>Student Name: </strong>
                          </Typography>
                          <Typography variant="body1" display={"inline"}>
                            {
                              JSON.parse(application.applicationData)
                                .studentfullname
                            }
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 0 }} textAlign={"left"}>
                          <Typography variant="body1" display={"inline"}>
                            <strong>Application ID: </strong>
                          </Typography>
                          <Typography variant="body1" display={"inline"}>
                            {application.applicationId}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 0 }} textAlign={"left"}>
                          <Typography variant="body1" display={"inline"}>
                            <strong>Submitted On: </strong>
                          </Typography>
                          <Typography variant="body1" display={"inline"}>
                            {application.submissionDate}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 0 }} textAlign={"left"}>
                          <Typography variant="body1" display={"inline"}>
                            <strong>Status: </strong>
                          </Typography>
                          <Typography
                            variant="body1"
                            display={"inline"}
                            color={
                              application.submissionStatus === "Payment Pending"
                                ? "#ed1852"
                                : "#59bab7"
                            }
                          >
                            <strong> {application.submissionStatus}</strong>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/**This is underline */}
                    <Box
                      width={"100%"}
                      height={"0.2px"}
                      border={"1.5px solid rgb(255, 130, 92)"}
                    />
                    {/**This is status stepper Box */}
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {application.submissionStatus &&
                      application.submissionStatus === "Payment Pending" ? (
                        <MyCustomButton color="primary" variant="contained">
                          Make Payment
                        </MyCustomButton>
                      ) : (
                        <ApplicationStepper activeStep={2} />
                      )}

                      {/* <MyCustomButton color="primary" variant="contained">
                      Make Payment
                    </MyCustomButton> */}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        } else {
          return null;
        }
      }
    );
  };

  const updateApplicationState = (newApplicationData: any) => {
    console.log("Inside updateApplicationState");

    console.log("Existing Applications");
    console.log(applications);

    console.log("New Application Data");
    console.log(newApplicationData);

    const updatedApplicationList = [...applications!, newApplicationData];
    setApplications(updatedApplicationList);
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid spacing={2} container>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              raised={true}
              onClick={() => setIsOpen(true)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                padding: "2rem",
                minWidth: "120px",
                // minHeight: "140px",
                // maxHeight: "150px",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "inline-block",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px) scale(1.1)",
                      color: "rgb(255, 80, 60)",
                    },
                    "&:active": {
                      transform: "translateY(-3px) scale(1.05)",
                    },
                  }}
                >
                  <SvgIcon
                    component={AddCircleIcon}
                    sx={{
                      fontSize: 60,
                      color: "rgb(255, 130, 92)",
                      cursor: "pointer",
                    }}
                  />
                </Box>
                <Typography variant="h5">
                  <strong>New Form</strong>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  To Fill New Admission Application
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* {loaderData && getCardsList(loaderData)} */}
          {applications &&
            applications.length > 0 &&
            getCardsList(applications)}
        </Grid>
        <Dialog
          open={isOpen}
          onClose={onClose}
          maxWidth="md"
          // disableEscapeKeyDown
        >
          <DialogContent
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
            <NewAdmissionForm
              onClose={onClose}
              userId={_userId!}
              phone={_phone!}
              newApplicationData={updateApplicationState}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default AdmissionDashboard;
