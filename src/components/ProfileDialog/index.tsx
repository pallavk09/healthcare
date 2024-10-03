import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { studentData } from "../../common/types";
import { useForm, Controller } from "react-hook-form";
import { MyCustomButton } from "../../common/MyCustomControls";
import CustomDatePicker from "../DatePicker";
import ControlledTextField from "../../common/ControlledComponents/ControlledTextField";
import ControlledSelect from "../../common/ControlledComponents/ControlledSelect";

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

const ProfileDialog: React.FC<ProfileDialogProps> = ({
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
    // mode: "onTouched",
  });

  useEffect(() => {
    if (profileData) {
      console.log("profileData");
      console.log(profileData);
      reset(profileData); // Reset form with new profileData
    }
  }, [profileData, reset]);

  useEffect(() => {
    if (resetFormRef) {
      resetFormRef.current = () => reset(profileData);
    }
  }, [resetFormRef, reset, profileData]);

  const handleFormSubmit = async (data: any) => {
    console.log("handleFormSubmit");
    console.log(data);
    const isValid = await trigger();
    if (isValid) {
      console.log("Data submission. Validation passed");
      onSubmit(data);
      onClose();
    } else {
      console.log("Data submission. Validation failed");
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>Manage Profile</strong>
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
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <strong>Personal Details</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={4} sx={{ mt: -3 }}>
                <Grid item xs={12}>
                  <ControlledTextField
                    name="studentfullname"
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
                  {/* <CustomDatePicker
                    format="DD-MM-YYYY"
                    name="studentdob"
                    label="Date of Birth"
                    control={control}
                    errors={errors}
                    rules={{ required: "required" }}
                     disabled={addSibling ? false : !isEditing}
                  /> */}

                  {/* Gender */}
                  <ControlledSelect
                    name="studentgender"
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
              </Grid>
            </AccordionDetails>
          </Accordion>
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
                    name="guardianname"
                    control={control}
                    errors={errors}
                    label="Guardian Name"
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

                <Grid
                  item
                  xs={12}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  {/* Relation with Student */}

                  <ControlledSelect
                    name="studentrelation"
                    control={control}
                    errors={errors}
                    label="Relation with Student"
                    rules={{ required: "Required" }}
                    options={[
                      { value: "", label: "Select" },
                      { value: "father", label: "Father" },
                      { value: "mother", label: "Mother" },
                    ]}
                    sx={{ width: "40%", mt: 0 }}
                    // value={formData?.studentObj.guardianDetails.studentrelation}
                    disabled={!isEditing}
                  />

                  <ControlledSelect
                    name="occupation"
                    control={control}
                    errors={errors}
                    label="Occupation"
                    rules={{ required: "Required" }}
                    options={[
                      { value: "", label: "Select" },
                      { value: "business", label: "Business" },
                      { value: "service", label: "Service" },
                      { value: "others", label: "Others" },
                    ]}
                    sx={{ width: "40%", mt: 0 }}
                    // value={formData?.studentObj.guardianDetails.occupation}
                    disabled={!isEditing}
                  />
                </Grid>

                {/**Phone Number */}
                <Grid item xs={8}>
                  <ControlledTextField
                    name="guardianphoneno"
                    control={control}
                    errors={errors}
                    label="Phone Number"
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
                    name="guardianemailid"
                    control={control}
                    errors={errors}
                    label="Email ID"
                    type="email"
                    // value={formData?.studentObj.guardianDetails.guardianemailid}
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
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">
                <strong>Academics</strong>
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

                  <ControlledTextField
                    name="rollnumber"
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

                {/**House Name */}

                <Grid item xs={12}>
                  <ControlledSelect
                    name="housename"
                    control={control}
                    errors={errors}
                    label="House Name"
                    rules={{ required: "Required" }}
                    options={[
                      { value: "", label: "Select" },
                      { value: "house1", label: "House1" },
                      { value: "house2", label: "House2" },
                      { value: "house3", label: "House3" },
                      { value: "house4", label: "House4" },
                    ]}
                    sx={{
                      width: "65%",
                    }}
                    disabled={addSibling ? false : !isEditing}
                  />
                </Grid>

                {/* Bus Number */}
                <Grid item xs={4}>
                  <ControlledSelect
                    name="busnumber"
                    control={control}
                    errors={errors}
                    label="Bus Number"
                    rules={{ required: "Required" }}
                    options={[
                      { value: "", label: "Select" },
                      { value: "bus1", label: "Bus1" },
                      { value: "bus2", label: "Bus2" },
                      { value: "bus3", label: "Bus3" },
                      { value: "bus4", label: "Bus4" },
                    ]}
                    sx={{
                      width: "65%",
                    }}
                    disabled={addSibling ? false : !isEditing}
                  />
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
                {addSibling ? "Add Sibling" : "Save Changes"}
              </MyCustomButton>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
