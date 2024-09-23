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

import HeaderLogin from "../../components/HeaderLogin";
import FooterLogin from "../../components/FooterLogin";

const Container = lazy(() => import("../../common/Container"));

const StudentDashboard = () => {
  const ctx = useContext(ApiContext);

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
    <>
      <HeaderLogin />
      <Container>
        <Grid container spacing={2} sx={{ height: "100vh" }}>
          <Grid item xs={4} sx={{ padding: "5px" }}>
            <Carousel
              autoPlay={false}
              animation="slide"
              onChange={(currentIndex) => handleCarouselChange(currentIndex)}
            >
              <p>Data will come soon here</p>
            </Carousel>
            {/* Button to add a new student */}
            <Button onClick={handleClickOpen}>Add My Sibling</Button>
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
