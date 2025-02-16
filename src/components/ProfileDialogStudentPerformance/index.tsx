import React, { FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
  Grid,
  Box,
  Avatar,
  CircularProgress,
  styled,
  Button,
  Paper,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses } from "@mui/material/TableCell";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { studentData } from "../../common/types";
import { useForm, Controller } from "react-hook-form";
import { MyCustomButton } from "../../common/MyCustomControls";
import CustomDatePicker from "../DatePicker";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { GeneratePrevieUrl } from "../../common/utils/generatePreviewUrl";
import moment from "moment";
import { v4 as uuid } from "uuid";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: studentData) => void;
  profileData: any;
  resetFormRef?: React.MutableRefObject<() => void>;
  isEditing: boolean;
  onEdit: () => void;
  addSibling?: boolean;
  isLoading?: boolean;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2E186A", //theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AnimatedButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        position: "relative",
        // fontFamily: "Motiva Sans Bold",
        // fontWeight: "Bold",
        padding: "0 10px",
        fontSize: "14px",
        textTransform: "none",
        color: "#2e186a",
        "&:hover": {
          fontWeight: "Bold",
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
      disabled={disabled == null ? true : disabled}
    >
      <strong>{label}</strong>
    </Button>
  );
};
const ProfileDialogStudentPerformance: React.FC<ProfileDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  profileData,
  resetFormRef,
  isEditing,
  onEdit,
  addSibling,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: profileData,
    mode: "onTouched",
    shouldUnregister: false, // Prevents unnecessary re-renders
  });
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();
  const [_profileData, _SetProfileData] = useState(profileData);
  const [isFormReady, setIsFormReady] = useState(false);

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      console.log("Pop up opened");
      console.log(profileData);
      _SetProfileData(profileData); // Update state correctly
    }
  }, [profileData]); // Re-run when `profileData` updates

  useEffect(() => {
    if (isOpen && profileData && Object.keys(profileData).length > 0) {
      setIsFormReady(false);
      setTimeout(() => {
        setIsFormReady(true);
      }, 200); // Reduce delay to avoid lag
    }
  }, [isOpen, profileData]); // Remove `_profileData`, rely on `profileData`

  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      console.log("Under useEffect of View Student Data");
      console.log(profileData);
      reset(profileData); // Reset form with new profileData

      const getPhotoUrl = profileData.photoUrl
        ? GeneratePrevieUrl(profileData.photoUrl)
        : "";

      if (profileData.photoUrl) {
        setPhotoFile(undefined);
      }

      setPhoto(getPhotoUrl);
    }
  }, [profileData, reset]); // Ensure it runs only when `profileData` is valid

  // useEffect(() => {
  //   if (profileData) {
  //     console.log("Pop up opened");
  //     console.log(profileData);
  //     _SetProfileData(profileData);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isOpen) {
  //     setIsFormReady(false); // Reset form rendering state
  //     setTimeout(() => {
  //       setIsFormReady(true); // Render form after small delay
  //     }, 2000);
  //   }
  // }, [isOpen, _profileData]); // Trigger re-render when profileData updates

  // useEffect(() => {
  //   if (profileData) {
  //     console.log("Under useEffect of View Student Data");
  //     console.log(profileData);
  //     reset(profileData); // Reset form with new profileData
  //     const getPhotoUrl = profileData?.photoUrl
  //       ? GeneratePrevieUrl(profileData.photoUrl)
  //       : "";
  //     profileData.photoUrl && setPhotoFile(undefined);

  //     setPhoto(getPhotoUrl);
  //   }
  // }, [profileData, reset]);

  useEffect(() => {
    if (resetFormRef) {
      const getPhotoUrl = profileData.photoUrl
        ? GeneratePrevieUrl(profileData.photoUrl)
        : "";
      profileData.photoUrl && setPhotoFile(undefined);
      setPhoto(getPhotoUrl);
      resetFormRef.current = () => reset(profileData);
    }
  }, [resetFormRef, reset, profileData]);

  const handleFormSubmit = async (data: any) => {
    console.log("handleFormSubmit");

    let updatedData = addSibling
      ? {
          ...data,
          id: uuid(),
          student_id: uuid(),
          photofile,
          academic_records: {
            ...data.academic_records,
            academic_year: GetCurrentAcademciSession(),
          },
        }
      : data;
    console.log(updatedData);
    const isValid = await trigger();
    if (isValid) {
      console.log("Data submission. Validation passed");
      onSubmit(updatedData);
      onClose();
    } else {
      console.log("Data submission. Validation failed");
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    // formData.append("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const GetCurrentAcademciSession = () => {
    const academic_session = `${moment().year()}-${moment().year() + 1}`;
    return academic_session;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>
            {addSibling
              ? "New Registration"
              : `${_profileData?.personal_details?.name}`}
          </strong>
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

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
        {/* {!isFormReady || !profileData ? ( */}
        {false ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                p={2}
                pt={0}
                height="auto"
                justifyContent={"center"}
                alignItems={"center"}
                mt={1}
              >
                {/* <Typography variant="h6" alignSelf={"center"}>
                  <strong>Half Yearly</strong>
                </Typography> */}

                <Accordion
                  sx={{
                    mt: 2,
                    width: "auto",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" alignSelf={"center"}>
                      <strong>Half Yearly</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            mb={2}
                          >
                            {/* <AnimatedButton
                              label="Generate Admit Card"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                            {"|"} */}
                            <AnimatedButton
                              label="Edit"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                            {"|"}
                            <AnimatedButton
                              label="Save"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                          </Box>
                          <TableContainer component={Paper}>
                            <Table size="medium" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Subject</StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-1
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-2
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-3
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-4
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Maths"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="marks"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"English"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Science"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Hindi"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Geography"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  sx={{
                    mt: 2,
                    width: "auto",
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" alignSelf={"center"}>
                      <strong>Annual</strong>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"column"}
                      >
                        <>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            alignItems={"center"}
                            justifyContent={"flex-end"}
                            mb={2}
                          >
                            {/* <AnimatedButton
                              label="Generate Admit Card"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                            {"|"} */}
                            <AnimatedButton
                              label="Edit"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                            {"|"}
                            <AnimatedButton
                              label="Save"
                              onClick={() => console.log("Get TC Clicked")}
                              disabled={false}
                            />
                          </Box>
                          <TableContainer component={Paper}>
                            <Table size="medium" aria-label="a dense table">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>Subject</StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-1
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-2
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-3
                                  </StyledTableCell>
                                  <StyledTableCell align="center">
                                    Exam-4
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>

                              <TableBody>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Maths"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="marks"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"English"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Science"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Hindi"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                                <StyledTableRow>
                                  <StyledTableCell component="th" scope="row">
                                    {"Geography"}
                                  </StyledTableCell>
                                  {["date1", "date2", "date3", "date4"].map(
                                    (key) => (
                                      <StyledTableCell align="right" key={key}>
                                        <ControlledTextField
                                          name="apaar"
                                          control={control}
                                          errors={errors}
                                          label="Marks"
                                          fullWidth
                                          disabled={!isEditing}
                                          sx={{ mt: 1 }}
                                        />
                                      </StyledTableCell>
                                    )
                                  )}
                                </StyledTableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Box>

              <DialogActions>
                <MyCustomButton
                  variant="contained"
                  onClick={onClose}
                  customcolor="#cb3d64"
                >
                  Close
                </MyCustomButton>
                {addSibling
                  ? ""
                  : !isEditing && (
                      <MyCustomButton
                        variant="contained"
                        customcolor="#00c9a6"
                        onClick={onEdit}
                      >
                        Edit
                      </MyCustomButton>
                    )}
                {/* {(isEditing || addSibling) && (
                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    customcolor="#00c9a6"
                  >
                    {addSibling ? "Submit" : "Save Changes"}
                  </MyCustomButton>
                )} */}
              </DialogActions>
            </form>
          </>
        )}

        {/* {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
         
        )} */}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialogStudentPerformance;
