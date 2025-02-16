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
  useEffect(() => {
    if (profileData) {
      console.log("Under useEffect of profileDialog. Profile data as below");
      console.log(profileData);
      reset(profileData); // Reset form with new profileData
      const getPhotoUrl = profileData.photoUrl
        ? GeneratePrevieUrl(profileData.photoUrl)
        : "";
      profileData.photoUrl && setPhotoFile(undefined);

      setPhoto(getPhotoUrl);
    }
  }, [profileData, reset]);

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
    let updatedData = { ...data, photofile };
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

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>Teachers Master Data</strong>
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                        alt="Teacher Photo"
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
                            document.getElementById("photo-upload")?.click()
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
                        <PersonIcon sx={{ fontSize: 120, color: "#bdbdbd" }} />
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
                            document.getElementById("photo-upload")?.click()
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
                name="teacherfullname"
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

            {/* Address */}
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              sx={{ mt: -3 }}
            >
              <ControlledTextField
                name="addressline1"
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
                name="addressline2"
                control={control}
                errors={errors}
                label="Address Line2"
                // value={formData?.studentObj.personalDetails.addressline2}
                sx={{ mt: 1 }}
                fullWidth
                disabled={!isEditing}
              />

              <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
                <ControlledTextField
                  name="addresscity"
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
                  name="addressstate"
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
                  name="addresspincode"
                  control={control}
                  errors={errors}
                  label="Pincode"
                  //   value={
                  //     formData?.studentObj.personalDetails.addresspincode
                  //   }
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
                format="DD-MM-YYYY"
                name="dob"
                label="Date of Birth"
                control={control}
                errors={errors}
                rules={{ required: "required" }}
                selectedDate={profileData.studentdob}
                disabled={addSibling ? false : !isEditing}
              />

              {/* Gender */}
              <ControlledSelect
                name="gender"
                control={control}
                errors={errors}
                label="Gender"
                rules={{ required: "Required" }}
                options={[
                  { value: "", label: "Select" },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Other", label: "Other" },
                ]}
                sx={{ width: "31%", mt: 2, ml: 3 }}
                disabled={addSibling ? false : !isEditing}
              />
            </Grid>

            {/* Father's Name */}
            <Grid item xs={12}>
              <ControlledTextField
                name="guardianname"
                control={control}
                errors={errors}
                label="Father's Name"
                // value={formData?.studentObj.guardianDetails.guardianname}
                rules={{
                  required: "Required",
                }}
                fullWidth
                required
                sx={{ width: "65%" }}
                disabled={!isEditing}
              />
            </Grid>

            {/**Phone Number */}
            <Grid item xs={8}>
              <ControlledTextField
                name="contact"
                control={control}
                errors={errors}
                label="Contact Number"
                // value={formData?.studentObj.guardianDetails.guardianphoneno}
                rules={{
                  required: "Required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
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
                name="emailid"
                control={control}
                errors={errors}
                label="Email ID"
                type="email"
                // value={formData?.studentObj.guardianDetails.guardianemailid}
                rules={{
                  required: "Required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                }}
                fullWidth
                required
                disabled={!isEditing}
              />
            </Grid>

            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              gap={5}
            >
              <ControlledSelect
                name="class"
                control={control}
                errors={errors}
                label="Class"
                rules={{ required: "Required" }}
                options={[
                  { value: "", label: "Select" },
                  { value: "lkg", label: "LKG" },
                  { value: "ukg", label: "UKG" },
                  { value: "class1", label: "CLASS1" },
                ]}
                sx={{ width: "30%", mt: 0 }}
                disabled={addSibling ? false : !isEditing}
              />

              <ControlledSelect
                name="section"
                control={control}
                errors={errors}
                label="Section"
                rules={{ required: "Required" }}
                options={[
                  { value: "", label: "Select" },
                  { value: "a", label: "A" },
                  { value: "b", label: "B" },
                  { value: "c", label: "C" },
                ]}
                sx={{ width: "30%", mt: 0 }}
                disabled={addSibling ? false : !isEditing}
              />
            </Grid>
          </Grid>

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
                {addSibling ? "Add Sibling" : "Save Changes"}
              </MyCustomButton>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialogTeacherDetailsAdmin;
