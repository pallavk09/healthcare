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
  Button,
  Divider,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewAdmissionForm from "../../components/Services/NewAdmission";
import newadmissionContext, {
  newAddmissionApplicationType,
} from "../../store/newadmissionContext";
import {
  CreateNewApplication,
  ListApplications,
  UpdateApplicationData,
} from "../../api/newAdmission";
import { json, useLoaderData, useNavigate } from "react-router-dom";
import { brown } from "@mui/material/colors";
import { MyCustomButton } from "../../common/MyCustomControls";
import ApplicationStepper from "../../components/ApplicationStepper";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

import userDataContext from "../../store/UserContext";
import { jwtDecode } from "jwt-decode";
import { GeneratePrevieUrl } from "../../common/utils/generatePreviewUrl";
import { VimlaPandeyDataProps } from "../../components/Services/NewAdmission/types";
import { VIMLA_PANDEY_INITIAL_STATE } from "../../components/Services/NewAdmission/initialStates";
import { uploadFile, UploadFileType } from "../../api/upload";
import generateUniqueId from "../../common/utils/generateUniqueId";
import LoadingDialog from "../../common/LoadingDialog";
import LockIcon from "@mui/icons-material/Lock";

const INITIAL_FORM_STATE: newAddmissionApplicationType = {
  photoUrl: null,
  userId: "",
  phone: "",
  emailId: "",
  applicationId: "",
  currentStatus: "",
  role: "NEWADMISSION",
  submissionDate: "",
  createdAt: "",
  statusUpdatedOn: "",
  applicationData: JSON.stringify(VIMLA_PANDEY_INITIAL_STATE),
  submissionStatus: "",
  paymentStatus: "",
  transactionId: "",
  interview: "",
};
const AdmissionDashboard = () => {
  // const loaderData = useLoaderData() as newAddmissionApplicationType[];
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [isAdmissionDialogOpen, setAdmissionDialogOpen] = useState(false);
  const [newForm, setNewForm] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [applications, setApplications] = useState<
    newAddmissionApplicationType[] | []
  >();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const snackbarRef = useRef<SnackbarHandle>(null);
  const resetFormRef = useRef<() => void>(() => {});

  const [newApplicationData, setNewApplicationData] =
    useState<newAddmissionApplicationType>(INITIAL_FORM_STATE);

  const statusOrder = {
    Verification: 0,
    Interview: 1,
    Selected: 3,
  };

  const ctx = useContext(newadmissionContext);
  const ctx_userData = useContext(userDataContext);

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setAdmissionDialogOpen(false);
    setIsEditing(false);
  };

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
                  // cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                  borderRadius: 4,
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
                                .studentFullName
                            }
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 0 }} textAlign={"left"}>
                          <Typography variant="body1" display={"inline"}>
                            <strong>Application ID: </strong>
                          </Typography>
                          <Button
                            type="button"
                            variant="text"
                            sx={{ p: 0, cursor: "pointer" }}
                            onClick={
                              () => viewEditForm(application)
                              // console.log("Application ID clicked", application)
                            }
                          >
                            <Typography
                              variant="body1"
                              display={"inline"}
                              sx={{ textDecoration: "underline" }}
                            >
                              {application.applicationId}
                            </Typography>
                          </Button>
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
                            <strong>
                              {application.submissionStatus ===
                              "Payment Pending"
                                ? "Payment Pending"
                                : application.currentStatus}
                            </strong>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {/**This is underline */}
                    <Divider
                      style={{
                        // color: "#000",
                        border: "1.5px solid rgb(255, 130, 92)",
                      }}
                    />
                    {/* <Box
                      width={"100%"}
                      height={"0.2px"}
                      border={"1.5px solid rgb(255, 130, 92)"}
                    /> */}
                    {/**This is status stepper Box */}
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      width={"100%"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      {/* <ApplicationStepper activeStep={2} /> */}
                      {
                        application.submissionStatus &&
                        application.submissionStatus === "Payment Pending" ? (
                          <Box
                            display={"flex"}
                            flexDirection={"column"}
                            gap={1}
                          >
                            <MyCustomButton
                              color="primary"
                              variant="contained"
                              startIcon={<LockIcon fontSize="small" />}
                            >
                              PAY 1000 INR
                            </MyCustomButton>
                            <Typography variant="caption" color="textSecondary">
                              Make payment to submit your application
                            </Typography>
                          </Box>
                        ) : (
                          ""
                        )
                        // <ApplicationStepper
                        //   //@ts-ignore
                        //   activeStep={statusOrder[application.currentStatus]}
                        // />
                      }

                      {application.currentStatus &&
                      application.currentStatus === "Interview Scheduled" ? (
                        <Typography>
                          <strong>
                            {`Kindly visit school on ${application.interview}`}
                          </strong>
                        </Typography>
                      ) : (
                        ""
                      )}

                      {application.currentStatus &&
                      application.currentStatus === "Interview" ? (
                        <Typography>
                          <strong>{`You will receive interview date and slot shortly.`}</strong>
                        </Typography>
                      ) : (
                        ""
                      )}

                      {application.currentStatus &&
                      application.currentStatus === "Verification" ? (
                        <Typography>
                          <strong>{`We are verifying your application. Updates will be shared shortly.`}</strong>
                        </Typography>
                      ) : (
                        ""
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

  const viewEditForm = (formData: newAddmissionApplicationType) => {
    setNewForm(false);
    setNewApplicationData(formData);
    setAdmissionDialogOpen(true);
  };

  const formatResponse = (responseObj: any): newAddmissionApplicationType => {
    let formattedResponse: newAddmissionApplicationType = {
      photoUrl: responseObj.photoUrl,
      userId: responseObj.userId,
      phone: responseObj.phone,
      emailId: responseObj.emailId,
      applicationId: responseObj.applicationId,
      currentStatus: responseObj.currentStatus,
      role: responseObj.role,
      submissionDate: responseObj.submissionDate,
      createdAt: responseObj.createdAt,
      statusUpdatedOn: responseObj.statusUpdatedOn,
      applicationData: responseObj.applicationData,
      submissionStatus: responseObj.submissionStatus,
      paymentStatus: responseObj.paymentStatus,
      transactionId: responseObj.transactionId,
      interview: responseObj.interview,
    };

    return formattedResponse;
  };

  const handleFormSubmit = async (data: VimlaPandeyDataProps) => {
    try {
      setIsLoading(true);
      if (newForm) {
        console.log("New Form");
        console.log(data);

        const photofile = data.photofile;
        console.log(`Photo URL as`);
        console.log(photofile);
        const uploadFileObject: UploadFileType = {
          filepath: photofile!,
          bucket_id: process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
        };
        const upload = await uploadFile(uploadFileObject);
        console.log("Photo uploaded. Printing response");
        console.log(upload);
        const newApplicationObj: newAddmissionApplicationType = {
          photoUrl: upload?.$id,
          userId: _userId!,
          phone: _phone!,
          emailId: "",
          applicationId: generateUniqueId(),
          currentStatus: "",
          role: "NEWADMISSION",
          submissionDate: "",
          createdAt: "",
          statusUpdatedOn: "",
          applicationData: JSON.stringify(data),
          submissionStatus: "Payment Pending",
          paymentStatus: "Pending",
          transactionId: "",
          interview: "",
        };
        console.log("newApplicationObj is below");
        console.log(newApplicationObj);
        const response = await CreateNewApplication(newApplicationObj);
        if (response?.newApplication) {
          console.log(`Application submission success. `);
          console.log(response.newApplication);
          ctx?.dispatch_newadmission({
            type: "ADD_NEW_APPLICATION",
            payload: response?.newApplication!,
          });
          snackbarRef.current?.showSnackbar(
            `Application saved successfully. Please proceed with payment`,
            "success"
          );
          // setIsLoading(false);
          setSubmissionSuccess(true);
          setApplications([...applications!, response.newApplication]);
        } else {
          console.log(`Application submission failed.`);
          console.log(response);
          snackbarRef.current?.showSnackbar(
            `Form Submission failed. Close this popup and try again`,
            "error"
          );
          setIsLoading(false);
        }
      } else {
        console.log("Update Form");
        console.log(data);
        console.log(newApplicationData);
        //@ts-ignore
        console.log(newApplicationData.$id!);
        let photoUrl = "";
        if (data.photofile) {
          const uploadFileObject: UploadFileType = {
            filepath: data.photofile,
            bucket_id: process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
          };
          console.log(uploadFileObject);
          const upload = await uploadFile(uploadFileObject);

          console.log("Photo uploaded. Printing response");
          console.log(upload);
          photoUrl = upload?.$id!;
        }

        const _updatedApplication = await UpdateApplicationData(
          //@ts-ignore
          newApplicationData.$id!,
          JSON.stringify(data),
          photoUrl
        );

        console.log("Application has been updated");
        console.log(_updatedApplication);

        console.log("Existing Applications");
        console.log(applications);

        // const updatedApplicationObj: newAddmissionApplicationType = {
        //   photoUrl: photoUrl,
        //   userId: newApplicationData.userId,
        //   phone: newApplicationData.phone,
        //   emailId: newApplicationData.emailId,
        //   applicationId: newApplicationData.applicationId,
        //   currentStatus: newApplicationData.currentStatus,
        //   role: newApplicationData.role,
        //   submissionDate: newApplicationData.submissionDate,
        //   createdAt: newApplicationData.createdAt,
        //   statusUpdatedOn: "",
        //   applicationData: JSON.stringify(data),
        //   submissionStatus: newApplicationData.submissionStatus,
        //   paymentStatus: newApplicationData.paymentStatus,
        //   transactionId: newApplicationData.transactionId,
        //   interview: newApplicationData.interview,
        // };

        const updatedApplicationsArray: newAddmissionApplicationType[] =
          applications!.map((application: newAddmissionApplicationType) => {
            //@ts-ignore
            return application.$id ===
              _updatedApplication.updatedApplication.$id
              ? _updatedApplication.updatedApplication
              : application;
          });

        snackbarRef.current?.showSnackbar(
          `Application updated successfully.`,
          "success"
        );

        setApplications(updatedApplicationsArray);
      }
    } catch (error: any) {
      console.log(`Error while submitting. Error: ${error.message}`);
      console.log(error);
      snackbarRef.current?.showSnackbar(
        `Some issue while submitting form. If persist please re-login and try again`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid spacing={2} container>
          <Grid item xs={12}>
            <Typography variant="caption" color="textSecondary" ml={2}>
              Click you Application ID to view or edit your application.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              raised={true}
              // onClick={() => setIsOpen(true)}
              style={{
                cursor: "pointer",
                textAlign: "center",
                padding: "2rem",
                minWidth: "120px",
                boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
                borderRadius: 4,
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
                    onClick={() => {
                      setNewForm(true);
                      setAdmissionDialogOpen(true);
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
          open={isAdmissionDialogOpen}
          onClose={onClose}
          maxWidth="lg"
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
              onSubmit={handleFormSubmit}
              newApplicationData={
                newForm ? INITIAL_FORM_STATE : newApplicationData
              }
              resetFormRef={resetFormRef}
              isEditing={true}
              onEdit={() => console.log("Ignore")}
            />
          </DialogContent>
        </Dialog>
        <LoadingDialog open={isLoading} />
      </Container>
    </>
  );
};

export default AdmissionDashboard;
