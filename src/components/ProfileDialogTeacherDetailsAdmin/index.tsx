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
import { vehicles_records } from "../../Config/vehicles_records";
import { stops_records } from "../../Config/stops_records";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: studentData) => void;
  profileData: any;
  resetFormRef?: React.MutableRefObject<() => void>;
  isEditing: boolean;
  onEdit: () => void;
  addSibling?: boolean;
}

const ProfileDialogTeacherDetailsAdmin: React.FC<ProfileDialogProps> = ({
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
  });
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();
  const [_profileData, _SetProfileData] = useState(profileData);
  const [isFormReady, setIsFormReady] = useState(false);
  const [vehicle_Stops, setVehicle_stops] = useState<any>([]);
  const [stopNames, setStopNames] = useState<any>([]);
  const [transportMode, setTransportMode] = useState("");

  useEffect(() => {
    if (
      profileData &&
      vehicles_records &&
      stops_records &&
      Object.keys(profileData).length > 0 &&
      Object.keys(vehicles_records).length > 0 &&
      Object.keys(stops_records).length > 0
    ) {
      console.log("Pop up opened");
      console.log(profileData);
      const _vehicle_stops = vehicles_records.map((vehicle) => ({
        vehicle_no: vehicle.vehicle_no,
        vehicle_id: vehicle.vehicle_id,
        name: stops_records
          .filter((stop) => stop.vehicle_id === vehicle.vehicle_id)
          .map((stop) => stop.name),
      }));

      const stopList = _vehicle_stops.filter(
        (stop: any) =>
          stop.vehicle_id === profileData.transport_details.vehicle_id
      );

      console.log("stopList");
      console.log(stopList);

      stopList[0]?.name && setStopNames(stopList[0]?.name || []);

      setVehicle_stops(_vehicle_stops);
      setTransportMode(profileData.transport_details.mode);
      _SetProfileData(profileData); // Update state correctly
    }
  }, [profileData, vehicles_records, stops_records]); // Re-run when `profileData` updates

  useEffect(() => {
    if (isOpen && profileData && Object.keys(profileData).length > 0) {
      setIsFormReady(false);
      setTimeout(() => {
        setIsFormReady(true);
      }, 200); // Reduce delay to avoid lag
    }
  }, [isOpen, profileData]);

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

  // useEffect(() => {
  //   if (profileData) {
  //     console.log("Under useEffect of profileDialog. Profile data as below");
  //     console.log(profileData);
  //     reset(profileData); // Reset form with new profileData
  //     const getPhotoUrl = profileData.photoUrl
  //       ? GeneratePrevieUrl(profileData.photoUrl)
  //       : "";
  //     profileData.photoUrl && setPhotoFile(undefined);

  //     setPhoto(getPhotoUrl);
  //   }
  // }, [profileData, reset]);

  // useEffect(() => {
  //   if (resetFormRef) {
  //     const getPhotoUrl = profileData.photoUrl
  //       ? GeneratePrevieUrl(profileData.photoUrl)
  //       : "";
  //     profileData.photoUrl && setPhotoFile(undefined);
  //     setPhoto(getPhotoUrl);
  //     resetFormRef.current = () => reset(profileData);
  //   }
  // }, [resetFormRef, reset, profileData]);

  const handleFormSubmit = async (data: any) => {
    let updatedData = { ...data, photofile };
    console.log(updatedData);
    const isValid = await trigger();
    if (isValid) {
      console.log("Data submission. Validation passed");
      onSubmit(data);
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

  const HandleVehicleNoChange = (event: any) => {
    console.log("HandleVehicleNoChange");
    console.log(event.target.value);
    const stopList = vehicle_Stops.filter(
      (stop: any) => stop.vehicle_id === event.target.value
    );

    console.log("stopList");
    console.log(stopList);

    setStopNames(stopList[0].name);
  };

  const HandleTransportModeChange = (event: any) => {
    setTransportMode(event.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>
            {addSibling
              ? "New Teacher"
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
              {/* Joining Details */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">
                    <strong>Joining Details</strong>
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
                        label="Joining Id"
                        fullWidth
                        disabled={!addSibling}
                      />

                      {/* </Grid> */}
                      <ControlledTextField
                        name="tp_code"
                        control={control}
                        errors={errors}
                        label="TP Code"
                        fullWidth
                        disabled={!isEditing}
                        sx={{ mt: 1 }}
                      />

                      <ControlledTextField
                        name="oasis_id"
                        control={control}
                        errors={errors}
                        label="Oasis ID"
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
                      gap={2}
                    >
                      <ControlledSelect
                        name="qualification"
                        control={control}
                        errors={errors}
                        label="Qualification"
                        options={[
                          { value: "Graduate", label: "Graduate" },
                          { value: "Post-Graduate", label: "Post Graduate" },
                          { value: "Masters", label: "Masters" },
                          { value: "P.hd", label: "P.hd" },
                          { value: "B.ed", label: "B.ed" },
                        ]}
                        sx={{ width: "25%", mt: 2, ml: 0 }}
                        disabled={!isEditing}
                      />

                      <ControlledSelect
                        name="type"
                        control={control}
                        errors={errors}
                        label="Teacher Catagory"
                        // rules={{ required: "Required" }}
                        options={[
                          {
                            value: "NTT",
                            label: "NTT-Nursury Trained Teacher",
                          },
                          { value: "PRT", label: "PRT-Primary Teacher" },
                          {
                            value: "TGT",
                            label: "TGT-Trained Graduate Teacher",
                          },
                          { value: "PGT", label: "PGT-Post Graduate Teacher" },
                          {
                            value: "PTI",
                            label: "PTI-Physical Trainer & Instructor",
                          },
                          {
                            value: "PET",
                            label: "PET-Physical Education Teacher",
                          },
                        ]}
                        sx={{ width: "40%", mt: 2, ml: 0 }}
                        disabled={!isEditing}
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
                        sx={{ width: "25%", mt: 2 }}
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
                      gap={2}
                    >
                      <CustomDatePicker
                        format="YYYY-MM-DD"
                        name="joining_date"
                        label="Date of Joining"
                        control={control}
                        errors={errors}
                        selectedDate={_profileData?.joining_date}
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
                        sx={{ width: "31%", mt: 2 }}
                        disabled={addSibling ? false : !isEditing}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>

              {/* Personal Details */}
              <Accordion sx={{ marginTop: 1 }}>
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
                      <ControlledTextField
                        name="personal_details.height"
                        control={control}
                        errors={errors}
                        label="Height (CM)"
                        sx={{ width: "31%", mt: 2, ml: 0 }}
                        type="number"
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

              {/* Transport Details */}
              <Accordion sx={{ marginTop: 1 }}>
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
                      <ControlledSelect
                        name="transport_details.mode"
                        control={control}
                        errors={errors}
                        label="Mode"
                        options={[
                          {
                            value: "School-Transport",
                            label: "School Transport",
                          },
                          {
                            value: "Personal-vehicle",
                            label: "Personal Vehicle",
                          },
                          { value: "On-Foot", label: "On Foot" },
                        ]}
                        sx={{ width: "40%", mt: 0 }}
                        disabled={!isEditing}
                        selectProps={{ onChange: HandleTransportModeChange }}
                      />

                      {transportMode === "School-Transport" && (
                        <ControlledSelect
                          name="transport_details.vehicle_id"
                          control={control}
                          errors={errors}
                          label="Vehicle No"
                          options={vehicle_Stops.map((data: any) => ({
                            value: data.vehicle_id,
                            label: data.vehicle_no,
                          }))}
                          sx={{ width: "40%", mt: 0 }}
                          disabled={!isEditing}
                          selectProps={{ onChange: HandleVehicleNoChange }}
                        />
                      )}

                      {transportMode === "School-Transport" && (
                        <ControlledSelect
                          name="transport_details.stop_name"
                          control={control}
                          errors={errors}
                          label="Stop"
                          options={stopNames.map((name: any) => ({
                            value: name,
                            label: name,
                          }))}
                          sx={{ width: "40%", mt: 0 }}
                          disabled={!isEditing}
                        />
                      )}
                    </Grid>
                  </Grid>
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
                    {addSibling ? "Add Teacher" : "Save Changes"}
                  </MyCustomButton>
                )}
              </DialogActions>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialogTeacherDetailsAdmin;
