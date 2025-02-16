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
import moment from "moment";
import { v4 as uuid } from "uuid";
import Multiselect from "../Multiselect/Multiselect";

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

const ProfileDialogSubjects: React.FC<ProfileDialogProps> = ({
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
  const [_profileData, _SetProfileData] = useState(profileData);

  useEffect(() => {
    if (profileData) {
      console.log("Pop up opened");
      console.log(profileData);
      _SetProfileData(profileData);
    }
  }, []);
  useEffect(() => {
    if (profileData) {
      console.log("Under useEffect of View Student Data");
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
    console.log("Handle submit for Subject");
    console.log(data);
    let _id = uuid();

    let updatedData = addSibling
      ? {
          ...data,
          id: _id,
          subject_id: _id,
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

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">
          <strong>{isEditing ? "Add New Subject" : "Edit Subject"}</strong>
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
          <Grid container sx={{ mt: -3 }}>
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"normal"}
              sx={{ mt: 4 }}
              gap={3}
            >
              <ControlledTextField
                name="code"
                control={control}
                errors={errors}
                label="Subject Code"
                rules={{
                  required: "Required",
                }}
                sx={{ width: "30%" }}
                required
                disabled={addSibling ? false : !isEditing}
              />

              <ControlledTextField
                name="title"
                control={control}
                errors={errors}
                label="Subject Title"
                rules={{
                  required: "Required",
                }}
                sx={{ width: "30%" }}
                required
                disabled={addSibling ? false : !isEditing}
              />

              <ControlledSelect
                name="marking"
                control={control}
                errors={errors}
                label="Grading System"
                rules={{ required: "Required" }}
                options={[
                  { value: "grade", label: "grade" },
                  { value: "marks", label: "marks" },
                ]}
                disabled={addSibling ? false : !isEditing}
                sx={{ width: "30%" }}
              />
            </Grid>
            {/* <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"normal"}
              sx={{ mt: 4 }}
              gap={3}
            >
              <Multiselect
                items={
                  addSibling
                    ? _profileData.classStructure.map((cls: any) => cls.name)
                    : []
                }
              />
            </Grid> */}
          </Grid>

          <DialogActions>
            <MyCustomButton
              variant="contained"
              onClick={onClose}
              // customcolor="#cb3d64"
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
                // customcolor="#00c9a6"
              >
                {addSibling ? "Add New" : "Save Changes"}
              </MyCustomButton>
            )}
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialogSubjects;
