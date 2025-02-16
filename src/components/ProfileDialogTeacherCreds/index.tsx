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

const ProfileDialogTeacherCreds: React.FC<ProfileDialogProps> = ({
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
          <strong>Credential Manager</strong>
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
            {/* Address */}
            <Grid
              item
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              sx={{ mt: -3 }}
            >
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
              </Grid>
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

export default ProfileDialogTeacherCreds;
