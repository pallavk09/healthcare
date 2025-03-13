import React, { useRef, useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, Avatar, CircularProgress } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { SvgIcon } from "../../../common/SvgIcon";
import ControlledTextField from "../../../common/ControlledComponents/ControlledTextField";
import { MyCustomButton } from "../../../common/MyCustomControls";
import ToastSnackbar, {
  SnackbarHandle,
} from "../../../common/ToastNotification";
import newadmissionContext, {
  newAddmissionApplicationType,
} from "../../../store/newadmissionContext";
import { CreateNewApplication } from "../../../api/newAdmission";
import { useNavigate } from "react-router-dom";
import userDataContext from "../../../store/UserContext";
import generateUniqueId from "../../../common/utils/generateUniqueId";
import {
  getFilePreview,
  uploadFile,
  UploadFileType,
} from "../../../api/upload";
import PersonIcon from "@mui/icons-material/Person";
import SchoolHeader from "../../AdmissionsForms/VimlaPandey/Header";
import ControlledSelect from "../../../common/ControlledComponents/ControlledSelect";
import CustomDatePicker from "../../DatePicker";
import { VimlaPandeyDataProps } from "./types";
import { useForm } from "react-hook-form";
import { GeneratePrevieUrl } from "../../../common/utils/generatePreviewUrl";
import formatDate from "../../../common/utils/formatDate";

interface NewAdmissionFormProps {
  onClose: () => void;
  onSubmit: (data: VimlaPandeyDataProps) => void;
  newApplicationData: newAddmissionApplicationType;
  resetFormRef?: React.MutableRefObject<() => void>;
  isEditing: boolean;
  onEdit: () => void;
  viewOnly?: boolean;
}

const NewAdmissionForm: React.FC<NewAdmissionFormProps> = ({
  onClose,
  onSubmit,
  newApplicationData,
  resetFormRef,
  isEditing,
  onEdit,
  viewOnly,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: JSON.parse(
      newApplicationData.applicationData
    ) as VimlaPandeyDataProps,
    mode: "onTouched",
  });

  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const snackbarRef = useRef<SnackbarHandle>(null);

  // Handle photo upload
  const handlePhotoUpload = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFormSubmit = async (data: any) => {
  //   try {
  //     console.log("handleFormSubmit for Application Form");
  //     console.log(data);
  //     const isValid = await trigger();

  //     if (isValid && _userId && _phone) {
  //       setIsLoading(true);
  //       console.log(
  //         `handleFormSubmit.Data Valid. User: ${_userId} and Phone: ${_phone}`
  //       );
  //       console.log(`Photo URL as`);
  //       console.log(photofile);

  //       const uploadFileObject: UploadFileType = {
  //         filepath: photofile!,
  //         bucket_id: process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
  //       };
  //       const upload = await uploadFile(uploadFileObject);

  //       console.log("Photo uploaded. Printing response");
  //       console.log(upload);

  //       const newApplicationObj: newAddmissionApplicationType = {
  //         photoUrl: upload?.$id,
  //         userId: _userId!,
  //         phone: _phone!,
  //         emailId: "",
  //         applicationId: generateUniqueId(),
  //         currentStatus: "",
  //         role: "NEWADMISSION",
  //         submissionDate: "",
  //         createdAt: "",
  //         statusUpdatedOn: "",
  //         applicationData: JSON.stringify(data),
  //         submissionStatus: "Payment Pending",
  //         paymentStatus: "Pending",
  //         transactionId: "",
  //         interview: "",
  //       };

  //       const response = await CreateNewApplication(newApplicationObj);
  //       if (response?.newApplication) {
  //         console.log(`Application submission success. `);
  //         console.log(response.newApplication);
  //         ctx?.dispatch_newadmission({
  //           type: "ADD_NEW_APPLICATION",
  //           payload: response?.newApplication!,
  //         });

  //         snackbarRef.current?.showSnackbar(
  //           `Application saved successfully. Please proceed with payment`,
  //           "success"
  //         );
  //         setIsLoading(false);
  //         setSubmissionSuccess(true);
  //         newApplicationData(response?.newApplication!);

  //         // navigate(0);
  //       } else {
  //         console.log(`Application submission failed.`);
  //         console.log(response);
  //         snackbarRef.current?.showSnackbar(
  //           `Form Submission failed. Close this popup and try again`,
  //           "error"
  //         );
  //         setIsLoading(false);
  //       }
  //     } else {
  //       console.log("Data submission. Validation failed");
  //       snackbarRef.current?.showSnackbar(
  //         `Unable to process. Re-login and try again`,
  //         "error"
  //       );
  //     }
  //   } catch (error: any) {
  //     console.log(`Error while submitting. Error: ${error.message}`);
  //     console.log(error);
  //     snackbarRef.current?.showSnackbar(
  //       `Some issue while submitting form. If persist please re-login and try again`,
  //       "error"
  //     );
  //   }
  // };

  useEffect(() => {
    if (resetFormRef) {
      const getPhotoUrl = newApplicationData.photoUrl
        ? GeneratePrevieUrl(newApplicationData.photoUrl)
        : "";
      newApplicationData.photoUrl && setPhotoFile(undefined);
      setPhoto(getPhotoUrl);
      resetFormRef.current = () =>
        reset(
          JSON.parse(newApplicationData.applicationData) as VimlaPandeyDataProps
        );
    }
  }, [resetFormRef, reset, newApplicationData]);

  const SubmitHandler = async (data: any) => {
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

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="space-between"
              // mr={{ md: 10 }}
              // textAlign={{ xs: "center", sm: "left" }}
            >
              <SchoolHeader />

              {/* Photo Upload Box */}

              <Box
                sx={{
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
                            opacity: !isEditing ? 0 : 1, // Show icon on hover
                          },
                        }}
                        onClick={() =>
                          isEditing &&
                          document.getElementById("photo-upload")?.click()
                        } // Trigger file input on click
                      >
                        <PhotoCameraIcon
                          sx={{ color: "white", fontSize: 40 }}
                        />
                      </Box>
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
                            opacity: !isEditing ? 0 : 1, // Show icon on hover
                          },
                        }}
                        onClick={() =>
                          isEditing &&
                          document.getElementById("photo-upload")?.click()
                        } // Trigger file input on click
                      >
                        <PhotoCameraIcon
                          sx={{ color: "white", fontSize: 40 }}
                        />
                      </Box>

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
            </Box>
          </Grid>
          {/* Student Details */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Personal Details</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="studentFullName"
              control={control}
              errors={errors}
              label="Student's Full Name"
              rules={{
                required: "Required",
              }}
              variant="standard"
              required
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
              format="DD-MM-YYYY"
              name="studentDOB"
              label="Date of Birth"
              control={control}
              errors={errors}
              rules={{ required: "required" }}
              selectedDate={formatDate(
                JSON.parse(newApplicationData.applicationData).studentDOB
              )}
              disabled={!isEditing}
            />

            {/* Gender */}
            <ControlledSelect
              name="studentGender"
              control={control}
              errors={errors}
              label="Gender"
              rules={{ required: "Required" }}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              sx={{ width: "31%", mt: 2, ml: 3 }}
              disabled={!isEditing}
              required
            />
          </Grid>

          {/* Fathers Details */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Father's Details</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="fatherName"
              control={control}
              errors={errors}
              label="Full Name"
              rules={{
                required: "Required",
              }}
              variant="standard"
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledSelect
              name="fatherEduQual"
              control={control}
              errors={errors}
              label="Education"
              rules={{ required: "Required" }}
              options={[
                { value: "Graduate` ", label: "Graduate" },
                { value: "Diploma", label: "Diploma" },
                { value: "Masters", label: "Masters" },
              ]}
              sx={{ width: "40%", mt: 2 }}
              disabled={!isEditing}
              required
            />

            <ControlledSelect
              name="fatherOccupation"
              control={control}
              errors={errors}
              label="Occupation"
              rules={{ required: "Required" }}
              options={[
                { value: "Business` ", label: "Business" },
                { value: "Service", label: "Service" },
                { value: "Others", label: "Others" },
              ]}
              sx={{ width: "40%", mt: 2, ml: 3 }}
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="fatherEmail"
              control={control}
              errors={errors}
              label="Email Address"
              rules={{
                required: "Required",
              }}
              variant="standard"
              type="email"
              disabled={!isEditing}
              required
            />
          </Grid>

          {/* Mother Details */}
          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Mother's Details</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="motherName"
              control={control}
              errors={errors}
              label="Full Name"
              rules={{
                required: "Required",
              }}
              variant="standard"
              disabled={!isEditing}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledSelect
              name="motherEduQual"
              control={control}
              errors={errors}
              label="Education"
              // rules={{ required: "Required" }}
              options={[
                { value: "Graduate` ", label: "Graduate" },
                { value: "Diploma", label: "Diploma" },
                { value: "Masters", label: "Masters" },
              ]}
              sx={{ width: "40%", mt: 2 }}
              disabled={!isEditing}
            />

            <ControlledSelect
              name="motherOccupation"
              control={control}
              errors={errors}
              label="Occupation"
              // rules={{ required: "Required" }}
              options={[
                { value: "Business` ", label: "Business" },
                { value: "Service", label: "Service" },
                { value: "Others", label: "Others" },
              ]}
              sx={{ width: "40%", mt: 2, ml: 3 }}
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <ControlledTextField
              name="motherEmail"
              control={control}
              errors={errors}
              label="Email Address"
              // rules={{
              //   required: "Required",
              // }}
              variant="standard"
              type="email"
              disabled={!isEditing}
              // required
            />
          </Grid>

          {/* Current Address Details */}
          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              <strong>Current Address</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} display={"flex"} flexDirection={"column"}>
            <ControlledTextField
              name="current_addressline1"
              control={control}
              errors={errors}
              label="Address Line1"
              // value={formData?.studentObj.personalDetails.addressline1}
              rules={{
                required: "Required",
              }}
              variant="standard"
              disabled={!isEditing}
              fullWidth
              required
            />

            <ControlledTextField
              name="current_addressline2"
              control={control}
              errors={errors}
              label="Address Line2"
              variant="standard"
              // value={formData?.studentObj.personalDetails.addressline2}
              sx={{ mt: 1 }}
              disabled={!isEditing}
              fullWidth
            />

            <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
              <ControlledTextField
                name="current_city"
                control={control}
                errors={errors}
                label="City"
                variant="standard"
                // value={formData?.studentObj.personalDetails.addresscity}
                rules={{
                  required: "Required",
                }}
                fullWidth
                disabled={!isEditing}
                required
                sx={{ mr: 2 }}
              />

              <ControlledTextField
                name="current_state"
                control={control}
                errors={errors}
                label="State"
                variant="standard"
                // value={formData?.studentObj.personalDetails.addressstate}
                rules={{
                  required: "Required",
                }}
                fullWidth
                disabled={!isEditing}
                required
                sx={{ ml: 2, mr: 2 }}
              />

              <ControlledTextField
                name="current_pincode"
                control={control}
                errors={errors}
                label="Pincode"
                variant="standard"
                //   value={
                //     formData?.studentObj.personalDetails.addresspincode
                //   }
                rules={{
                  required: "Required",
                }}
                fullWidth
                disabled={!isEditing}
                required
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>

          {/* Permanent Address Details */}
          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              <strong>Permanent Address</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} display={"flex"} flexDirection={"column"}>
            <ControlledTextField
              name="permanent_addressline1"
              control={control}
              errors={errors}
              label="Address Line1"
              // value={formData?.studentObj.personalDetails.addressline1}
              rules={{
                required: "Required",
              }}
              variant="standard"
              fullWidth
              disabled={!isEditing}
              required
            />

            <ControlledTextField
              name="permanent_addressline2"
              control={control}
              errors={errors}
              label="Address Line2"
              variant="standard"
              // value={formData?.studentObj.personalDetails.addressline2}
              sx={{ mt: 1 }}
              disabled={!isEditing}
              fullWidth
            />

            <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
              <ControlledTextField
                name="permanent_city"
                control={control}
                errors={errors}
                label="City"
                variant="standard"
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
                name="permanent_state"
                control={control}
                errors={errors}
                label="State"
                variant="standard"
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
                name="permanent_pincode"
                control={control}
                errors={errors}
                label="Pincode"
                variant="standard"
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

          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Whether the candidate is</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ControlledSelect
              name="singleGirlChild"
              control={control}
              errors={errors}
              label="Single Girl Child"
              rules={{ required: "Required" }}
              options={[
                { value: "Yes` ", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              sx={{ width: "30%", mt: 0 }}
              disabled={!isEditing}
              required
            />

            <ControlledSelect
              name="speciallyAbled"
              control={control}
              errors={errors}
              label="Specially abled (Divyangjan)"
              rules={{ required: "Required" }}
              options={[
                { value: "Yes` ", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              sx={{ width: "30%", mt: 0, ml: 3 }}
              disabled={!isEditing}
              required
            />
            <ControlledSelect
              name="belongToEWS"
              control={control}
              errors={errors}
              label="Belonging to the EWS"
              rules={{ required: "Required" }}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              sx={{ width: "30%", mt: 0, ml: 3 }}
              disabled={!isEditing}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Category and Adhaar(Attach proof)</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
              <ControlledSelect
                name="catagory"
                control={control}
                errors={errors}
                label="Select Catagory"
                rules={{ required: "Required" }}
                options={[
                  { value: "General", label: "General" },
                  { value: "OBC", label: "OBC" },
                  { value: "ST", label: "ST" },
                  { value: "SC", label: "SC" },
                  { value: "EWS", label: "EWS" },
                ]}
                sx={{ width: "40%" }}
                disabled={!isEditing}
                required
              />

              <ControlledTextField
                name="adhaar"
                control={control}
                errors={errors}
                label="Aadhar No."
                variant="standard"
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

          <Grid item xs={12}>
            <Typography variant="h5" mt={2}>
              <strong>Previous School Details</strong>
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ControlledTextField
              name="lastSchoolName"
              control={control}
              errors={errors}
              label="Name of School where studied last"
              variant="standard"
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            <ControlledSelect
              name="lastClassStudies"
              control={control}
              errors={errors}
              label="Class Last attended"
              options={[
                { value: "ClassI", label: "Class I" },
                { value: "ClassII", label: "Class II" },
                { value: "ClassIII", label: "CLass III" },
              ]}
              sx={{ width: "30%" }}
              disabled={!isEditing}
            />

            <ControlledSelect
              name="lastSchoolAffiliation"
              control={control}
              errors={errors}
              label="Last School affiliated to"
              // rules={{ required: "Required" }}
              options={[
                { value: "CBSE` ", label: "CBSE" },
                { value: "ICSE", label: "ICSE" },
                { value: "IB", label: "IB" },
                { value: "State_Board", label: "State Board" },
              ]}
              sx={{ width: "30%", ml: 3 }}
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              <strong>Result of last class</strong>
            </Typography>
          </Grid>
          <Grid item display={"flex"} flexDirection={"column"} xs={12} gap={2}>
            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject1"
                control={control}
                errors={errors}
                label="Subject 1"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject1_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject1_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject1_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject1_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject2"
                control={control}
                errors={errors}
                label="Subject 2"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject2_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject2_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject2_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject2_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject3"
                control={control}
                errors={errors}
                label="Subject 3"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject3_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject3_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject3_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject3_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject4"
                control={control}
                errors={errors}
                label="Subject 4"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject4_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject4_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject4_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject4_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject5"
                control={control}
                errors={errors}
                label="Subject 5"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject5_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject5_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject5_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject5_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>

            <Grid item display={"flex"} flexDirection={"row"} xs={12} gap={2}>
              <ControlledTextField
                name="subject6"
                control={control}
                errors={errors}
                label="Subject 6"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject6_max_marks"
                control={control}
                errors={errors}
                label="Maximum Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject6_marks_obtained"
                control={control}
                errors={errors}
                label="Marks obtained"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject6_percentage"
                control={control}
                errors={errors}
                label="% of Marks"
                variant="standard"
                disabled={!isEditing}
              />
              <ControlledTextField
                name="subject6_remarks"
                control={control}
                errors={errors}
                label="Remarks"
                variant="standard"
                disabled={!isEditing}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={2}>
              <strong>Transfer Certificate Details</strong>
            </Typography>
          </Grid>

          <Grid item xs={10}>
            <ControlledTextField
              name="transfer_certificate_no"
              control={control}
              errors={errors}
              label="Transfer Certificate No"
              variant="standard"
              disabled={!isEditing}
            />

            <CustomDatePicker
              format="DD-MM-YYYY"
              name="date_of_issue"
              label="Date of issue"
              control={control}
              errors={errors}
              selectedDate={formatDate(
                JSON.parse(newApplicationData.applicationData).date_of_issue
              )}
              disabled={!isEditing}
            />
          </Grid>

          {/* Submit Button */}
          {!viewOnly && (
            <Grid
              item
              xs={12}
              gap={3}
              sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
            >
              <MyCustomButton
                type="button"
                variant="contained"
                color="primary"
                custombackground="#cb3d64"
                customcolor="#D81E51"
                onClick={onClose}
                sx={{
                  width: "18%",
                }}
                disabled={isLoading}
              >
                Close
              </MyCustomButton>
              <MyCustomButton
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  width: "20%",
                }}
                disabled={isLoading || submissionSuccess}
                // startIcon={isLoading ? <CircularProgress size={20} /> : null}
              >
                {newApplicationData.submissionStatus === "Payment Pending"
                  ? "Update Application"
                  : "Save Application"}

                {/* {isLoading
                ? "Saving..."
                : submissionSuccess
                ? "Saved"
                : "Save Application"} */}
              </MyCustomButton>
            </Grid>
          )}
        </Grid>
      </form>
    </>
  );
};

export default NewAdmissionForm;
