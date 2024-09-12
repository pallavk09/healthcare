import { lazy, useState, useContext } from "react";
import ApiContext from "../../store/context";
import {
  Avatar,
  // Button,
  Card,
  CardContent,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  // Container,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import StudentProfileDashboard from "../../components/Dashboard/StudentProfileDashboard";
import { Button } from "../../common/Button";
import formatDate from "../../common/utils/formatDate";

const Container = lazy(() => import("../../common/Container"));

const StudentDashboard = () => {
  const ctx = useContext(ApiContext);
  console.log(ctx?.state?.studentMasterData);

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
    <Container>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <Grid item xs={4} sx={{ padding: "5px" }}>
          <Carousel
            autoPlay={false}
            animation="slide"
            onChange={(currentIndex) => handleCarouselChange(currentIndex)}
            // indicatorContainerProps={{
            //   style: {
            //     // zIndex: 1,
            //     // marginTop: "50px",
            //     // position: "relative",
            //     // bottom: "10px",
            //   },
            // }}
          >
            {ctx?.state?.studentMasterData.map((student) => (
              <Card
                key={student.id}
                // onClick={() => handleStudentSelect(student)}
                sx={{
                  // marginBottom: "20px",
                  cursor: "pointer",
                  border: "2px solid #f5f5f5",
                }}
              >
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item xs={4}>
                      <Avatar
                        src={"https://via.placeholder.com/150"}
                        alt={student.studentfullname}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6" fontWeight="bold">
                        {student.studentfullname}
                      </Typography>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        fontWeight="bold"
                      >
                        DOB:
                      </Typography>{" "}
                      <Typography variant="body2" display={"inline"}>
                        {formatDate(student?.studentdob)}
                      </Typography>
                    </Grid>

                    {/*2nd Row */}
                    <Grid item xs={12} sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        fontWeight="bold"
                      >
                        Guardian's Name:
                      </Typography>{" "}
                      <Typography variant="body2" display={"inline"}>
                        {student?.guardianname}
                      </Typography>
                    </Grid>

                    {/*3rd Row */}
                    <Grid item xs={4} sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        fontWeight="bold"
                      >
                        Gender:
                      </Typography>{" "}
                      <Typography variant="body2" display={"inline"}>
                        {student?.studentgender?.toUpperCase()}
                      </Typography>
                    </Grid>

                    <Grid item xs={4} sx={{ mt: 2 }}>
                      <Typography variant="body2" display={"inline"}>
                        {`${student?.class?.toUpperCase()} - ${student?.section.toUpperCase()}`}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        fontWeight="bold"
                      >
                        Roll No:
                      </Typography>{" "}
                      <Typography variant="body2" display={"inline"}>
                        {student?.rollnumber}
                      </Typography>
                    </Grid>

                    {/**4th Row */}
                    <Grid item xs={6} sx={{ mt: 2 }}>
                      <Typography
                        variant="body2"
                        display={"inline"}
                        fontWeight="bold"
                      >
                        House Name:
                      </Typography>{" "}
                      <Typography variant="body2" display={"inline"}>
                        {student?.housename?.toUpperCase()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Carousel>
          {/* Button to add a new student */}
          <Button onClick={handleClickOpen}>Add Student</Button>
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
  );
};

export default StudentDashboard;
