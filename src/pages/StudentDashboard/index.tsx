//#region Import Statements
import { lazy, useState, useContext, useEffect, useRef } from "react";
import ApiContext from "../../store/context";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import StudentProfileDashboard from "../../components/Dashboard/StudentProfileDashboard";
import FooterLogin from "../../components/FooterLogin";
import { useLoaderData, json } from "react-router-dom";
import { CreateNewStudent, ListStudents } from "../../api/students";
import { studentData } from "../../common/types";
import ProfileDialog from "../../components/ProfileDialog";
import { MyCustomButton } from "../../common/MyCustomControls";
import formatDate from "../../common/utils/formatDate";
import { FormatNewStudentPayload } from "../../helper/formatPayload";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import LoadingDialog from "../../common/LoadingDialog";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import userDataContext from "../../store/userContext";
import { jwtDecode } from "jwt-decode";
import { GeneratePrevieUrl } from "../../common/utils/generatePreviewUrl";

const Container = lazy(() => import("../../common/Container"));

//#endregion

const AnimatedButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        position: "relative",
        // fontFamily: "Motiva Sans Bold",
        fontWeight: "Bold",
        padding: "0 10px",
        fontSize: "14px",
        textTransform: "none",
        color: "#2e186a",
        "&:hover": {
          // fontWeight: "Bold",
          fontSize: "15px",
        },
        "&::after": {
          content: '""',
          fontWeight: "Bold",
          position: "absolute",
          width: "0",
          height: "2px",
          left: "0",
          bottom: "-2px",
          backgroundColor: "rgb(255, 130, 92)",
          transition: "width 0.3s ease-in-out",
        },
        "&:hover::after": {
          width: "100%", // Underline expands on hover
        },
      }}
    >
      {label}
    </Button>
  );
};

// export async function Loader({ params }: { params: any }) {
//   try {
//     console.log(`params.userId!: ${params.userId!}`);
//     const studentList = await ListStudents(params.userId!);
//     if (studentList?.result && studentList?.result.length > 0) {
//       return studentList?.result;
//     } else {
//       throw json({ message: "Could not fetch students" }, { status: 500 });
//     }
//   } catch (error: any) {
//     throw json(
//       { message: `Could not fetch students. Error${error.message}` },
//       { status: 500 }
//     );
//   }
// }

const StudentDashboard = () => {
  const ctx = useContext(ApiContext);
  const ctx_userData = useContext(userDataContext);
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<studentData>();
  const [students, setStudents] = useState<studentData[] | null>();
  const [isProfileDialogOpen, setProfileDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [addSibling, setAddSibling] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  // Reference to control reset from parent
  const resetFormRef = useRef<() => void>(() => {});
  const snackbarRef = useRef<SnackbarHandle>(null);

  const onClose = () => {
    if (resetFormRef.current) {
      resetFormRef.current(); // Reset the form to its initial state
    }
    setProfileDialogOpen(false);
    setIsEditing(false);
  };

  // const studentData = useLoaderData() as any;

  useEffect(() => {
    console.log("Under useEffect of StudentDashboard.");
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

      const LoadStudents = async (userId: string) => {
        try {
          console.log(`Calling ListStudents. userId!: ${userId}`);
          const studentList = await ListStudents(userId!);
          if (studentList?.result && studentList?.result.length > 0) {
            const studentFormatted = formatStudentDataForContext(
              studentList?.result
            );
            setStudents(studentFormatted);
            setSelectedStudent(studentFormatted![0]);
          } else {
            snackbarRef.current?.showSnackbar(
              `Something wrong could not data.`,
              "error"
            );
          }
        } catch (error: any) {
          snackbarRef.current?.showSnackbar(
            `Error while fetching data ${error.message}`,
            "error"
          );
        }
      };

      LoadStudents(accessToken_decode.userId);
    } else {
      console.log("Token not found. Logging out");
      navigate("/student");
    }
  }, []);

  const openProfileDialog = () => {
    console.log("Manage Profile clicked");
    setProfileDialogOpen(true);
  };

  const formatStudentDataForContext = (studentArray: any) => {
    let siblingsArray: studentData[] | null;
    try {
      console.log("formatStudentDataForContext. studentArray received as");
      console.log(studentArray);
      // let siblingsArray: studentData[] | {} = {};
      siblingsArray = studentArray.map((student: any) => {
        return {
          userId: student.userId,
          phone: student.phone,
          newAdmission: student.newAdmission,
          fees: student.fees,
          studentObj: {
            photoUrl: student.photoUrl,
            id: student.studentId,
            personalDetails: {
              ...student.personalDetails,
              studentdob: formatDate(student.personalDetails.studentdob),
            },
            guardianDetails: student.guardianDetails,
            academicsDetails: student.academicsDetails,
          },
        };
      });
      return siblingsArray;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleCarouselChange = (studentIndex: any) => {
    console.log(`Student Index is: ${studentIndex}`);
    if (students && students.length > 0)
      setSelectedStudent(students[studentIndex]);
  };

  const handleSaveProfile = async (data: any) => {
    try {
      setLoading(true);
      if (addSibling) {
        console.log("New Student to be added");
        console.log("Sibling Data:", data);
        console.log("Current Context");
        console.log(ctx?.state);
        const studentId = `studid${uuid()}`;
        if (_userId && _phone) {
          const value_Formatted = FormatNewStudentPayload(
            data,
            _userId,
            studentId,
            _phone
          );
          console.log(`Formatted sibling value`);
          console.log(value_Formatted);
          const _newStudent = await CreateNewStudent(value_Formatted);

          if (_newStudent && _newStudent.newStudent) {
            console.log("Sibling created");
            console.log(_newStudent.newStudent);

            const studentObj = {
              id: _newStudent.newStudent.studentId,
              personalDetails: JSON.parse(
                _newStudent.newStudent.personalDetails
              ),
              guardianDetails: JSON.parse(
                _newStudent.newStudent.guardianDetails
              ),
              academicsDetails: JSON.parse(
                _newStudent.newStudent.academicsDetails
              ),
            };

            const formattedSibling = {
              userId: _newStudent.newStudent.userId,
              phone: _newStudent.newStudent.phone,
              newAdmission: _newStudent.newStudent.newAdmission,
              fees: _newStudent.newStudent.fees,
              studentObj,
            };

            const updatedStudents = [
              ...students!,
              formattedSibling,
            ] as studentData[];

            console.log(`Updated Student state`);
            console.log(updatedStudents);
            setStudents(updatedStudents);
            //Refresh the page
            // navigate(0);
          } else {
            console.log("Error adding Sibling to userID: ", _userId);
            console.log(_newStudent);
          }
        } else {
          console.log(
            `UserID or Phone is null under context. UserId: ${ctx?.state.userId} and phone: ${ctx?.state.phone}`
          );

          snackbarRef.current?.showSnackbar(`Something went wrong.`, "error");
        }
      } else {
        console.log("Update existing students");
        console.log("Manage Profile. Saved Data:", data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const formatDataforFormInput = (profileData: any) => {
    let defaultValues = {
      studentfullname: profileData?.studentObj.personalDetails.studentfullname,
      addressline1: profileData?.studentObj.personalDetails.addressline1,
      addressline2: profileData?.studentObj.personalDetails.addressline2,
      addresscity: profileData?.studentObj.personalDetails.addresscity,
      addressstate: profileData?.studentObj.personalDetails.addressstate,
      addresspincode: profileData?.studentObj.personalDetails.addresspincode,
      studentdob: profileData?.studentObj.personalDetails.studentdob,
      studentgender: profileData?.studentObj.personalDetails.studentgender,
      guardianname: profileData?.studentObj.guardianDetails.guardianname,
      studentrelation: profileData?.studentObj.guardianDetails.studentrelation,
      occupation: profileData?.studentObj.guardianDetails.occupation,
      guardianphoneno: profileData?.studentObj.guardianDetails.guardianphoneno,
      guardianemailid: profileData?.studentObj.guardianDetails.guardianemailid,
      class: profileData?.studentObj.academicsDetails.class,
      section: profileData?.studentObj.academicsDetails.section,
      rollnumber: profileData?.studentObj.academicsDetails.rollnumber,
      housename: profileData?.studentObj.academicsDetails.housename,
      busnumber: profileData?.studentObj.academicsDetails.busnumber,
      photoUrl: profileData?.studentObj.photoUrl,
    };

    return defaultValues;
  };

  const formatDataforSiblings = (profileData: any) => {
    let defaultValues = {
      studentfullname: "",
      addressline1: profileData?.studentObj.personalDetails.addressline1,
      addressline2: profileData?.studentObj.personalDetails.addressline2,
      addresscity: profileData?.studentObj.personalDetails.addresscity,
      addressstate: profileData?.studentObj.personalDetails.addressstate,
      addresspincode: profileData?.studentObj.personalDetails.addresspincode,
      studentdob: "",
      studentgender: "",
      guardianname: profileData?.studentObj.guardianDetails.guardianname,
      studentrelation: profileData?.studentObj.guardianDetails.studentrelation,
      occupation: profileData?.studentObj.guardianDetails.occupation,
      guardianphoneno: profileData?.studentObj.guardianDetails.guardianphoneno,
      guardianemailid: profileData?.studentObj.guardianDetails.guardianemailid,
      class: "",
      section: "",
      rollnumber: "",
      housename: "",
      busnumber: "",
      photoUrl: "",
    };

    return defaultValues;
  };

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <Container>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid item xs={3} sx={{ padding: "5px" }}>
            <Carousel
              autoPlay={false}
              animation="slide"
              onChange={(currentIndex) => handleCarouselChange(currentIndex)}
            >
              {students &&
                students.map((student: studentData) => (
                  <Card
                    key={student.studentObj.id}
                    // onClick={() => handleStudentSelect(student)}
                    sx={{
                      cursor: "pointer",
                      border: "2px solid #f5f5f5",
                    }}
                  >
                    <CardContent>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"center"}
                        >
                          <Avatar
                            src={GeneratePrevieUrl(
                              student.studentObj.photoUrl!
                            )}
                            alt={
                              student.studentObj.personalDetails
                                ?.studentfullname
                            }
                            // variant="square"
                            sx={{
                              width: 150,
                              height: 150,
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"center"}
                        >
                          <Typography variant="h6" color="#df0c0c">
                            <strong>
                              {
                                student.studentObj.personalDetails
                                  .studentfullname
                              }
                            </strong>
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          display={"flex"}
                          flexDirection={"row"}
                          justifyContent={"center"}
                        >
                          <AnimatedButton
                            label="Manage Profile"
                            onClick={() => {
                              openProfileDialog();
                              setAddSibling(false);
                            }}
                          />
                          {/* {"|"}
                          <AnimatedButton
                            label="Edit Profile"
                            onClick={() => console.log("Clicked")}
                          /> */}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
            </Carousel>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={() => {
                  openProfileDialog();
                  setAddSibling(true);
                }}
              >
                Add Siblings
              </MyCustomButton>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <StudentProfileDashboard student={selectedStudent} />
          </Grid>
        </Grid>
      </Container>
      <ProfileDialog
        isOpen={isProfileDialogOpen}
        onClose={onClose}
        onSubmit={handleSaveProfile}
        profileData={
          addSibling
            ? formatDataforSiblings(selectedStudent!)
            : formatDataforFormInput(selectedStudent!)
        }
        resetFormRef={resetFormRef}
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        addSibling={addSibling}
      />
      <LoadingDialog open={loading} />
      {/* Show loading dialog during API processing */}
      <FooterLogin />
    </>
  );
};

export default StudentDashboard;
