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
} from "@mui/material";
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

const ProfileDialogStudentDetailsAdmin: React.FC<ProfileDialogProps> = ({
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
        {!isFormReady || !profileData ? (
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
              {/* Admission Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Admission Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="admission_id"
                        control={control}
                        errors={errors}
                        label="Admission Id"
                        fullWidth
                        disabled={!addSibling}
                      />

                      {/* </Grid> */}
                      <ControlledTextField
                        name="apaar"
                        control={control}
                        errors={errors}
                        label="Apaar Id"
                        fullWidth
                        disabled={!isEditing}
                        sx={{ mt: 1 }}
                      />

                      <ControlledTextField
                        name="pen"
                        control={control}
                        errors={errors}
                        label="Pen Id"
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="adhaar"
                        control={control}
                        errors={errors}
                        label="Adhaar No"
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                    >
                      <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="admission_date"
                        label="Date of Admission"
                        control={control}
                        errors={errors}
                        selectedDate={_profileData?.admission_date}
                        disabled={!isEditing}
                      />

                      {/* Is Active */}
                      <ControlledSelect
                        name="is_active"
                        control={control}
                        errors={errors}
                        label="Is Active"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "active", label: "active" },
                          { value: "inactive", label: "inactive" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={addSibling ? false : !isEditing}
                      />

                      <ControlledSelect
                        name="admission_catagory"
                        control={control}
                        errors={errors}
                        label="Admission Catagory"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "general", label: "General" },
                          { value: "staff_ward", label: "Staff Ward" },
                          { value: "bpl", label: "BPL" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={true}
                      />
                      <ControlledSelect
                        name="cast"
                        control={control}
                        errors={errors}
                        label="Cast"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "gen", label: "GEN" },
                          { value: "obc1", label: "OBC1" },
                          { value: "obc2", label: "OBC2" },
                          { value: "st", label: "ST" },
                          { value: "sc", label: "SC" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={true}
                      />

                      <ControlledSelect
                        name="admission_scheme"
                        control={control}
                        errors={errors}
                        label="Scheme"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "rte", label: "RTE" },
                          { value: "non-rte", label: "Non RTE" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={true}
                      />
                    </Grid>
                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Previous School Details</strong>
                    </Typography>
                    {/* Previous School Details */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="previous_school.name"
                        control={control}
                        errors={errors}
                        label="School Name"
                        fullWidth
                        disabled={!addSibling}
                      />
                      {/* English Hindi Maths */}
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <ControlledTextField
                          name={`previous_school.marks.english`}
                          control={control}
                          errors={errors}
                          label="Marks English"
                          type="number"
                          rules={{
                            required: "Required",
                          }}
                          sx={{ width: "30%", mt: 0 }}
                          required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.maths`}
                          control={control}
                          errors={errors}
                          label="Marks Maths"
                          type="number"
                          rules={{
                            required: "Required",
                          }}
                          sx={{ width: "30%", mt: 0 }}
                          required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.hindi`}
                          control={control}
                          errors={errors}
                          label="Marks Hindi"
                          type="number"
                          rules={{
                            required: "Required",
                          }}
                          sx={{ width: "30%", mt: 0 }}
                          required
                          disabled={addSibling ? false : !isEditing}
                        />
                      </Grid>

                      {/* English Hindi Maths */}
                      <Grid
                        item
                        xs={12}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"flex-start"}
                        gap={5}
                      >
                        <ControlledTextField
                          name={`previous_school.marks.science`}
                          control={control}
                          errors={errors}
                          label="Marks Science"
                          type="number"
                          rules={{
                            required: "Required",
                          }}
                          sx={{ width: "30%", mt: 0 }}
                          required
                          disabled={addSibling ? false : !isEditing}
                        />

                        <ControlledTextField
                          name={`previous_school.marks.computer`}
                          control={control}
                          errors={errors}
                          label="Marks Computer"
                          type="number"
                          rules={{
                            required: "Required",
                          }}
                          sx={{ width: "30%", mt: 0 }}
                          required
                          disabled={addSibling ? false : !isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Transport Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Transport Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                      gap={2}
                    >
                      <ControlledTextField
                        name="transport_details.mode"
                        control={control}
                        errors={errors}
                        label="Mode"
                        disabled={!addSibling}
                        sx={{
                          width: "30%",
                        }}
                      />

                      {/* </Grid> */}
                      <ControlledTextField
                        name="transport_details.stop_name"
                        control={control}
                        errors={errors}
                        label="Stop"
                        disabled={!isEditing}
                        sx={{
                          width: "30%",
                        }}
                      />

                      <ControlledTextField
                        name="transport_details.vehicle_no"
                        control={control}
                        errors={errors}
                        label="Vehicle No"
                        sx={{
                          width: "30%",
                        }}
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Personal Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Personal Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4} sx={{ mt: -3 }}>
                    <Grid item xs={8}>
                      <Box
                        sx={{
                          // position: { xs: "static", md: "absolute" },
                          // top: { md: 16 },
                          // right: { md: 16 },
                          mt: { xs: 2, md: 0 },
                          width: 132,
                          height: 170,
                          border: "2px solid #ccc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#f5f5f5",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {photo ? (
                            <>
                              <Avatar
                                src={photo as string}
                                alt="Student Photo"
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                                variant="square"
                              />
                              {/* Hover effect for Camera Icon */}
                              {(addSibling || isEditing) && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    bgcolor: "rgba(0, 0, 0, 0.4)", // Dark overlay on hover
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                      opacity: 1, // Show icon on hover
                                    },
                                  }}
                                  onClick={() =>
                                    document
                                      .getElementById("photo-upload")
                                      ?.click()
                                  } // Trigger file input on click
                                >
                                  <PhotoCameraIcon
                                    sx={{ color: "white", fontSize: 40 }}
                                  />
                                </Box>
                              )}
                              <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handlePhotoUpload}
                              />
                            </>
                          ) : (
                            <>
                              <Avatar
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  bgcolor: "#f0f0f0", // Background color for the empty avatar
                                }}
                                variant="square"
                              >
                                <PersonIcon
                                  sx={{ fontSize: 120, color: "#bdbdbd" }}
                                />
                              </Avatar>
                              {/* Hover effect for Camera Icon when no photo */}
                              {(addSibling || isEditing) && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    bgcolor: "rgba(0, 0, 0, 0.4)", // Dark overlay on hover
                                    opacity: 0,
                                    transition: "opacity 0.3s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                      opacity: 1, // Show icon on hover
                                    },
                                  }}
                                  onClick={() =>
                                    document
                                      .getElementById("photo-upload")
                                      ?.click()
                                  } // Trigger file input on click
                                >
                                  <PhotoCameraIcon
                                    sx={{ color: "white", fontSize: 40 }}
                                  />
                                </Box>
                              )}

                              <input
                                id="photo-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handlePhotoUpload}
                              />
                            </>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="personal_details.name"
                        control={control}
                        errors={errors}
                        label="Full Name"
                        rules={{
                          required: "Required",
                        }}
                        sx={{ width: "65%" }}
                        // value={formData?.studentObj.personalDetails.studentfullname}
                        required
                        disabled={addSibling ? false : !isEditing}
                      />
                    </Grid>

                    {/* DOB and Gender */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                    >
                      <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="personal_details.dob"
                        label="Date of Birth"
                        control={control}
                        errors={errors}
                        rules={{ required: "required" }}
                        selectedDate={_profileData?.personal_details?.dob}
                        disabled={addSibling ? false : !isEditing}
                      />

                      {/* Gender */}
                      <ControlledSelect
                        name="personal_details.gender"
                        control={control}
                        errors={errors}
                        label="Gender"
                        rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "male", label: "male" },
                          { value: "female", label: "female" },
                          { value: "other", label: "other" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={addSibling ? false : !isEditing}
                      />
                    </Grid>

                    {/* Height and Blood Group */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"normal"}
                      sx={{ mt: -1 }}
                    >
                      <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="personal_details.height"
                        label="Height (CM)"
                        control={control}
                        errors={errors}
                        // rules={{ required: "required" }}
                        selectedDate={_profileData?.personal_details?.dob}
                        disabled={addSibling ? false : !isEditing}
                      />

                      <ControlledSelect
                        name="personal_details.blood_group"
                        control={control}
                        errors={errors}
                        label="Blood Group"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "A+", label: "A+" },
                          { value: "A-", label: "A-" },
                          { value: "B+", label: "B+" },
                          { value: "B-", label: "B-" },
                          { value: "O+", label: "O+" },
                          { value: "O-", label: "O-" },
                          { value: "Ab+", label: "Ab+" },
                          { value: "Ab-", label: "Ab-" },
                        ]}
                        sx={{ width: "31%", mt: 2, ml: 3 }}
                        disabled={addSibling ? false : !isEditing}
                      />
                    </Grid>

                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Correspondence Address</strong>
                    </Typography>

                    {/*Correspondence Address */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="personal_details.correspondence_address.addressline1"
                        control={control}
                        errors={errors}
                        label="Address Line1"
                        // value={formData?.studentObj.personalDetails.addressline1}
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="personal_details.correspondence_address.addressline2"
                        control={control}
                        errors={errors}
                        label="Address Line2"
                        // value={formData?.studentObj.personalDetails.addressline2}
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ mt: 1 }}
                      >
                        <ControlledTextField
                          name="personal_details.correspondence_address.city"
                          control={control}
                          errors={errors}
                          label="City"
                          // value={formData?.studentObj.personalDetails.addresscity}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.correspondence_address.state"
                          control={control}
                          errors={errors}
                          label="State"
                          // value={formData?.studentObj.personalDetails.addressstate}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2, mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.correspondence_address.pincode"
                          control={control}
                          errors={errors}
                          label="Pincode"
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2 }}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>

                    <Typography variant="body2" pl={2} pt={2} ml={2}>
                      <strong>Permanent Address</strong>
                    </Typography>

                    {/*Permanent Address */}
                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"column"}
                      sx={{ mt: -3 }}
                    >
                      <ControlledTextField
                        name="personal_details.permanent_address.addressline1"
                        control={control}
                        errors={errors}
                        label="Address Line1"
                        // value={formData?.studentObj.personalDetails.addressline1}
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />

                      <ControlledTextField
                        name="personal_details.permanent_address.addressline2"
                        control={control}
                        errors={errors}
                        label="Address Line2"
                        // value={formData?.studentObj.personalDetails.addressline2}
                        sx={{ mt: 1 }}
                        fullWidth
                        disabled={!isEditing}
                      />

                      <Grid
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ mt: 1 }}
                      >
                        <ControlledTextField
                          name="personal_details.permanent_address.city"
                          control={control}
                          errors={errors}
                          label="City"
                          // value={formData?.studentObj.personalDetails.addresscity}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.permanent_address.state"
                          control={control}
                          errors={errors}
                          label="State"
                          // value={formData?.studentObj.personalDetails.addressstate}
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2, mr: 2 }}
                          disabled={!isEditing}
                        />

                        <ControlledTextField
                          name="personal_details.permanent_address.pincode"
                          control={control}
                          errors={errors}
                          label="Pincode"
                          rules={{
                            required: "Required",
                          }}
                          fullWidth
                          required
                          sx={{ ml: 2 }}
                          disabled={!isEditing}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Parents Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Parents Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" pt={2}>
                    <strong>Father's Details</strong>
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="father_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <ControlledSelect
                        name="father_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="father_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="father_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="father_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>

                  <Typography variant="body2" pt={2}>
                    <strong>Mother's Details</strong>
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="mother_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        rules={{
                          required: "Required",
                        }}
                        fullWidth
                        required
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <ControlledSelect
                        name="mother_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="mother_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="mother_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="mother_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Guardian Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Guardian Details</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    {/* Father's Name */}
                    <Grid item xs={12}>
                      <ControlledTextField
                        name="guardian_details.name"
                        control={control}
                        errors={errors}
                        label="Name"
                        // value={formData?.studentObj.guardianDetails.guardianname}
                        // rules={{
                        //   required: "Required",
                        // }}
                        fullWidth
                        // required
                        sx={{ width: "65%" }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      gap={2}
                    >
                      <ControlledSelect
                        name="guardian_details.education"
                        control={control}
                        errors={errors}
                        label="Education"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Graduate", label: "Graduate" },
                          { value: "PG", label: "PG" },
                          { value: "Masters", label: "Masters" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      {/* Relation with Student */}

                      <ControlledSelect
                        name="guardian_details.relation"
                        control={control}
                        errors={errors}
                        label="Blood Relation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Father", label: "Father" },
                          { value: "Mother", label: "Mother" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="guardian_details.occupation"
                        control={control}
                        errors={errors}
                        label="Occupation"
                        // rules={{ required: "Required" }}
                        options={[
                          { value: "", label: "Select" },
                          { value: "Business", label: "Business" },
                          { value: "Service", label: "Service" },
                          { value: "Others", label: "Others" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Phone Number */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="guardian_details.contact"
                        control={control}
                        errors={errors}
                        label="Phone"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Invalid Number",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>

                    {/**Email ID */}
                    <Grid item xs={8}>
                      <ControlledTextField
                        name="guardian_details.email"
                        control={control}
                        errors={errors}
                        label="Email"
                        type="email"
                        rules={{
                          // required: "Required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email address",
                          },
                        }}
                        fullWidth
                        // required
                        disabled={!isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Academics Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Academics</strong>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {_profileData.academic_records &&
                  _profileData.academic_records.length > 0 ? (
                    _profileData.academic_records.map(
                      (record: any, index: number) => {
                        return (
                          <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography variant="h6">
                                <strong>{record.academic_year}</strong>
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container spacing={2} sx={{ mt: 0 }}>
                                {/**Class, Section and Roll Number*/}
                                <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledSelect
                                    name={`academic_records[${index}].class`}
                                    control={control}
                                    errors={errors}
                                    label="Class"
                                    rules={{ required: "Required" }}
                                    options={[
                                      { value: "", label: "Select" },
                                      { value: "LKG", label: "LKG" },
                                      { value: "UKG", label: "UKG" },
                                      { value: "Class 1", label: "Class 1" },
                                      { value: "Class 2", label: "Class 2" },
                                      { value: "Class 3", label: "Class 3" },
                                      { value: "Class 4", label: "Class 4" },
                                      { value: "Class 5", label: "Class 5" },
                                      { value: "Class 6", label: "Class 6" },
                                    ]}
                                    sx={{ width: "30%", mt: 0 }}
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledSelect
                                    name={`academic_records[${index}].section`}
                                    control={control}
                                    errors={errors}
                                    label="Section"
                                    rules={{ required: "Required" }}
                                    options={[
                                      { value: "", label: "Select" },
                                      { value: "A", label: "A" },
                                      { value: "B", label: "B" },
                                      { value: "C", label: "C" },
                                    ]}
                                    sx={{ width: "30%", mt: 0 }}
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].roll_number`}
                                    control={control}
                                    errors={errors}
                                    label="Roll Number"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.English`}
                                    control={control}
                                    errors={errors}
                                    label="Marks English"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.Math`}
                                    control={control}
                                    errors={errors}
                                    label="Marks Maths"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />

                                  <ControlledTextField
                                    name={`academic_records[${index}].marks.Science`}
                                    control={control}
                                    errors={errors}
                                    label="Marks Science"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                </Grid>

                                <Grid
                                  item
                                  xs={12}
                                  display={"flex"}
                                  flexDirection={"row"}
                                  justifyContent={"normal"}
                                  gap={2}
                                >
                                  <ControlledTextField
                                    name={`academic_records[${index}].attendance.total`}
                                    control={control}
                                    errors={errors}
                                    label="Total Working Days"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                  <ControlledTextField
                                    name={`academic_records[${index}].attendance.present`}
                                    control={control}
                                    errors={errors}
                                    label="Days Present"
                                    type="number"
                                    rules={{
                                      required: "Required",
                                    }}
                                    sx={{ width: "30%", mt: 0 }}
                                    required
                                    disabled={addSibling ? false : !isEditing}
                                  />
                                </Grid>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        );
                      }
                    )
                  ) : (
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">
                          <strong>{GetCurrentAcademciSession()}</strong>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2} sx={{ mt: 0 }}>
                          {/**Class, Section and Roll Number*/}
                          <Grid
                            item
                            xs={12}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <ControlledSelect
                              name={`academic_records[${0}].class`}
                              control={control}
                              errors={errors}
                              label="Class"
                              rules={{ required: "Required" }}
                              options={[
                                { value: "", label: "Select" },
                                { value: "LKG", label: "LKG" },
                                { value: "UKG", label: "UKG" },
                                { value: "Class 1", label: "Class 1" },
                                { value: "Class 2", label: "Class 2" },
                                { value: "Class 3", label: "Class 3" },
                                { value: "Class 4", label: "Class 4" },
                                { value: "Class 5", label: "Class 5" },
                                { value: "Class 6", label: "Class 6" },
                              ]}
                              sx={{ width: "30%", mt: 0 }}
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledSelect
                              name={`academic_records[${0}].section`}
                              control={control}
                              errors={errors}
                              label="Section"
                              rules={{ required: "Required" }}
                              options={[
                                { value: "", label: "Select" },
                                { value: "A", label: "A" },
                                { value: "B", label: "B" },
                                { value: "C", label: "C" },
                              ]}
                              sx={{ width: "30%", mt: 0 }}
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledTextField
                              name={`academic_records[${0}].roll_number`}
                              control={control}
                              errors={errors}
                              label="Roll Number"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <ControlledTextField
                              name={`academic_records[${0}].marks.English`}
                              control={control}
                              errors={errors}
                              label="Marks English"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledTextField
                              name={`academic_records[${0}].marks.Math`}
                              control={control}
                              errors={errors}
                              label="Marks Maths"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />

                            <ControlledTextField
                              name={`academic_records[${0}].marks.Science`}
                              control={control}
                              errors={errors}
                              label="Marks Science"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <ControlledTextField
                              name={`academic_records[${0}].attendance.total`}
                              control={control}
                              errors={errors}
                              label="Total Working Days"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />
                            <ControlledTextField
                              name={`academic_records[${0}].attendance.present`}
                              control={control}
                              errors={errors}
                              label="Days Present"
                              type="number"
                              rules={{
                                required: "Required",
                              }}
                              sx={{ width: "30%", mt: 0 }}
                              required
                              disabled={addSibling ? false : !isEditing}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  )}
                </AccordionDetails>
              </Accordion>

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
                {(isEditing || addSibling) && (
                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    customcolor="#00c9a6"
                  >
                    {addSibling ? "Submit" : "Save Changes"}
                  </MyCustomButton>
                )}
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

export default ProfileDialogStudentDetailsAdmin;
