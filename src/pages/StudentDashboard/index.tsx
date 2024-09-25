import { lazy, useState, useContext, useEffect } from "react";
import ApiContext from "../../store/context";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  Box,
  // Container,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import StudentProfileDashboard from "../../components/Dashboard/StudentProfileDashboard";
// import { Button } from "../../common/Button";
import formatDate from "../../common/utils/formatDate";

import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";
import { useParams, useLoaderData, json } from "react-router-dom";
import { ListStudents } from "../../api/students";

const Container = lazy(() => import("../../common/Container"));

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

export async function Loader({ params }: { params: any }) {
  try {
    console.log(`params.userId!: ${params.userId!}`);
    const studentList = await ListStudents(params.userId!);
    if (studentList?.result && studentList?.result.length > 0) {
      return studentList?.result;
    } else {
      throw json({ message: "Could not fetch students" }, { status: 500 });
    }
  } catch (error: any) {
    throw json(
      { message: `Could not fetch students. Error${error.message}` },
      { status: 500 }
    );
  }
}

const StudentDashboard = () => {
  const ctx = useContext(ApiContext);
  console.log("Student Dashboard.");
  console.log(ctx?.state);
  const studentData = useLoaderData() as any;

  console.log("Printing student from Loader data");
  console.log(studentData);
  useEffect(() => {
    // console.log("Under useEffect of Student dashboard block");
    // console.log(ctx?.state);

    console.log("Under useEffect. Printing student from Loader data");
    console.log(studentData);
    //Possibility of page refresh
    //Write function to format structure and updare context
  }, []);
  const initialStudents = [
    {
      id: 1,
      name: "John Doe",
      class: "10th Grade",
      photo: "https://via.placeholder.com/150",
      details: "John is a 10th-grade student excelling in science and math.",
    },
    {
      id: 2,
      name: "Jane Smith",
      class: "9th Grade",
      photo: "https://via.placeholder.com/150",
      details:
        "Jane is a 9th-grade student with a passion for art and literature.",
    },
    {
      id: 3,
      name: "Tom Hanks",
      class: "11th Grade",
      photo: "https://via.placeholder.com/150",
      details:
        "Tom is an 11th-grade student who excels in sports and leadership.",
    },
  ];

  // const dummyData = [
  //   {
  //     userId: "66ed6c390012595e90ab",
  //     studentObj: {
  //       id: "1",
  //       personalDetails: {
  //         studentfullname: "Pallav Kumar",
  //         addressline1: "New Delhi Tent House",
  //         addressline2: "Bus Stand, Jail Hata",
  //         addresscity: "Daltonganj",
  //         addressstate: "Jharkhand",
  //         addresspincode: "822101",
  //         studentdob: "13/06/1990",
  //         studentgender: "Male",
  //       },
  //       guardianDetails: {
  //         guardianname: "Mukul Vishwakarma",
  //         studentrelation: "Father",
  //         occupation: "Business",
  //         guardianphoneno: "+918580370340",
  //         guardianemailid: "pallavk09@gmail.com",
  //       },
  //       academicsDetails: {
  //         class: "CLASS-I",
  //         section: "B",
  //         rollnumber: "12",
  //         housename: "House1",
  //         busnumber: "Bus1",
  //       },
  //       newAdmission: false,
  //       fees: [],
  //     },
  //   },
  // ];

  const [selectedStudent, setSelectedStudent] = useState(initialStudents[0]);
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState(initialStudents);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    photo: "",
    details: "",
  });

  const handleCarouselChange = (studentIndex: any) => {
    setSelectedStudent(students[studentIndex]);
  };

  // Handles opening and closing the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewStudent({
      ...newStudent,
      [name]: value,
    });
  };

  const handleAddStudent = () => {
    const newStudentEntry = {
      ...newStudent,
      id: students.length + 1, // Generate a new ID based on array length
    };
    setStudents([...students, newStudentEntry]);
    setSelectedStudent(newStudentEntry);
    handleClose();
  };

  return (
    <>
      <Container>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid item xs={3} sx={{ padding: "5px" }}>
            <Carousel
              autoPlay={false}
              animation="slide"
              onChange={(currentIndex) => handleCarouselChange(currentIndex)}
            >
              {/* {ctx?.state?.siblings.map((student) => ( */}
              {studentData.map((student: any) => (
                <Card
                  key={student.studentId}
                  // onClick={() => handleStudentSelect(student)}
                  sx={{
                    // marginBottom: "20px",
                    cursor: "pointer",
                    border: "2px solid #f5f5f5",
                  }}
                >
                  <CardContent
                  // sx={{
                  //   background: "#f7f7f7",
                  // }}
                  >
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                      >
                        <Avatar
                          src={`/img/profilepic-formals-whiteBG.jpg`}
                          alt={student.personalDetails.studentfullname}
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
                            {student.personalDetails.studentfullname}
                          </strong>
                        </Typography>
                        {/* <Typography
                          variant="body2"
                          display={"inline"}
                          fontWeight="bold"
                        >
                          DOB:
                        </Typography>{" "}
                        <Typography variant="body2" display={"inline"}>
                          {formatDate(
                            student?.studentObj.personalDetails.studentdob
                          )}
                        </Typography> */}
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"center"}
                      >
                        <AnimatedButton
                          label="View Profile"
                          onClick={() => console.log("Clicked")}
                        />
                        {"|"}
                        <AnimatedButton
                          label="Edit Profile"
                          onClick={() => console.log("Clicked")}
                        />
                      </Grid>

                      {/*2nd Row */}
                      {/* <Grid item xs={12} sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          display={"inline"}
                          fontWeight="bold"
                        >
                          Guardian's Name:
                        </Typography>{" "}
                        <Typography variant="body2" display={"inline"}>
                          {student?.studentObj.guardianDetails.guardianname}
                        </Typography>
                      </Grid> */}
                      {/*3rd Row */}
                      {/* <Grid item xs={4} sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          display={"inline"}
                          fontWeight="bold"
                        >
                          Gender:
                        </Typography>{" "}
                        <Typography variant="body2" display={"inline"}>
                          {student?.studentObj.personalDetails.studentgender?.toUpperCase()}
                        </Typography>
                      </Grid> */}
                      {/* <Grid item xs={4} sx={{ mt: 2 }}>
                        <Typography variant="body2" display={"inline"}>
                          {!student?.studentObj.newAdmission &&
                            `${student?.studentObj.academicsDetails?.class?.toUpperCase()} - ${student?.studentObj.academicsDetails?.section?.toUpperCase()}`}
                        </Typography>
                      </Grid> */}
                      {/* <Grid item xs={4} sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          display={"inline"}
                          fontWeight="bold"
                        >
                          Roll No:
                        </Typography>{" "}
                        <Typography variant="body2" display={"inline"}>
                          {student?.studentObj.academicsDetails?.rollnumber}
                        </Typography>
                      </Grid> */}
                      {/**4th Row */}
                      {/* <Grid item xs={6} sx={{ mt: 2 }}>
                        <Typography
                          variant="body2"
                          display={"inline"}
                          fontWeight="bold"
                        >
                          House Name:
                        </Typography>{" "}
                        <Typography variant="body2" display={"inline"}>
                          {student?.studentObj.academicsDetails?.housename?.toUpperCase()}
                        </Typography>
                      </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Carousel>
            {/* Button to add a new student */}
            <Box
              display={"flex"}
              width={"100%"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
                sx={{
                  width: "50%",
                }}
              >
                Add Sibling
              </MyCustomButton>
            </Box>
          </Grid>

          <Grid item xs={8}>
            <StudentProfileDashboard student={selectedStudent} />
          </Grid>
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a New Student</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              name="name"
              label="Student Name"
              fullWidth
              variant="outlined"
              value={newStudent.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="class"
              label="Class"
              fullWidth
              variant="outlined"
              value={newStudent.class}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="photo"
              label="Photo URL"
              fullWidth
              variant="outlined"
              value={newStudent.photo}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="details"
              label="Student Details"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={newStudent.details}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddStudent} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <FooterLogin />
    </>
  );
};

export default StudentDashboard;
