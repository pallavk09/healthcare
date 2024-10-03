import React, { useRef, useState, useContext, useEffect } from "react";
import { Box, Grid, Typography, Avatar, CircularProgress } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { SvgIcon } from "../../../common/SvgIcon";
import ControlledTextField from "../../../common/ControlledComponents/ControlledTextField";
import { useForm } from "react-hook-form";
import { MyCustomButton } from "../../../common/MyCustomControls";
import ToastSnackbar, {
  SnackbarHandle,
} from "../../../common/ToastNotification";
import newadmissionContext, {
  newAddmissionApplicationType,
} from "../../../store/newadmissionContext";
import { CreateNewApplication } from "../../../api/newAdmission";
import { useNavigate } from "react-router-dom";
import userDataContext from "../../../store/userContext";
import generateUniqueId from "../../../common/utils/generateUniqueId";
import {
  getFilePreview,
  uploadFile,
  UploadFileType,
} from "../../../api/upload";

const NewAdmissionForm = ({
  onClose,
  userId,
  phone,
  newApplicationData,
}: {
  onClose: () => void;
  userId: string;
  phone: string;
  newApplicationData: (data: any) => void;
}) => {
  const ctx = useContext(newadmissionContext);
  const ctx_user = useContext(userDataContext);
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const snackbarRef = useRef<SnackbarHandle>(null);
  const navigate = useNavigate();

  let blobfile: Blob;
  // const formData = new FormData();

  useEffect(() => {
    setUserId(userId);
    setPhone(phone);
  }, []);

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

  // Handle form input changes
  // const handleChange = (e: any) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleFormSubmit = async (data: any) => {
    try {
      console.log("handleFormSubmit for Application Form");
      console.log(data);
      const isValid = await trigger();

      if (isValid && _userId && _phone) {
        setIsLoading(true);
        console.log(
          `handleFormSubmit.Data Valid. User: ${_userId} and Phone: ${_phone}`
        );
        console.log(`Photo URL as`);
        console.log(photofile);

        const uploadFileObject: UploadFileType = {
          filepath: photofile!,
          bucket_id: process.env.REACT_APP_APPWRITE_NEW_ADMISSION_BUCKET_ID!,
        };
        const upload = await uploadFile(uploadFileObject);

        console.log("Photo uploaded. Printing response");
        console.log(upload);

        const newApplicationObj: newAddmissionApplicationType = {
          photoUrl: upload?.$id,
          userId: _userId!,
          phone: _phone!,
          emailId: "",
          applicationId: generateUniqueId(),
          status: "",
          role: "NEWADMISSION",
          submissionDate: "",
          createdAt: "",
          statusUpdatedOn: "",
          applicationData: JSON.stringify(data),
          submissionStatus: "Payment Pending",
          paymentStatus: "Pending",
          transactionId: "",
        };

        const response = await CreateNewApplication(newApplicationObj);
        if (response?.newApplication) {
          console.log(`Application submission success. `);
          console.log(response.newApplication);
          ctx?.dispatch_newadmission({
            type: "ADD_NEW_APPLICATION",
            payload: response?.newApplication!,
          });

          snackbarRef.current?.showSnackbar(
            `Application saved successfully. Please proceed with payment`,
            "success"
          );
          setIsLoading(false);
          setSubmissionSuccess(true);
          newApplicationData(response?.newApplication!);

          // navigate(0);
        } else {
          console.log(`Application submission failed.`);
          console.log(response);
          snackbarRef.current?.showSnackbar(
            `Form Submission failed. Close this popup and try again`,
            "error"
          );
          setIsLoading(false);
        }
      } else {
        console.log("Data submission. Validation failed");
        snackbarRef.current?.showSnackbar(
          `Unable to process. Re-login and try again`,
          "error"
        );
      }
    } catch (error: any) {
      console.log(`Error while submitting. Error: ${error.message}`);
      console.log(error);
      snackbarRef.current?.showSnackbar(
        `Some issue while submitting form. If persist please re-login and try again`,
        "error"
      );
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    defaultValues: {},
    // mode: "onTouched",
  });

  return (
    <>
      <ToastSnackbar ref={snackbarRef} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="space-between"
              // mr={{ md: 10 }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <Box display={"flex"} flexDirection={"row"} mr={9}>
                <SvgIcon
                  src="dummySchoolLogo.svg"
                  width="150px"
                  height="150px"
                />
                <Box mt={{ xs: 2, sm: 0 }} textAlign={{ xs: "center" }}>
                  <Typography variant="h4">
                    <strong>Maharaja Public School</strong>
                  </Typography>
                  <Typography variant="body2" color="#4b4a54">
                    <strong>
                      NH-30, Rewa-Satna Road, Bela Satna M.P.- 485115
                    </strong>
                  </Typography>
                  <Typography variant="body2" color="#d10057">
                    CBSE Affiliation No. 1030591, School code: 50566, Dist Code:
                    23130111812
                  </Typography>
                  <Typography variant="body2" color="#d10057">
                    <strong>Email:</strong> founder@mosrewa.com,{" "}
                    <strong>Website:</strong> maharajapublicschoolbela.com
                  </Typography>
                  <Typography variant="h5" p={1}>
                    <strong>Application for Admission</strong>
                  </Typography>
                  <Typography variant="body2" mt={-1}>
                    Session 2024-25
                  </Typography>
                </Box>
              </Box>
              {/* Photo Upload Box */}
              <Box
                sx={{
                  // position: { xs: "static", md: "absolute" },
                  // top: { md: 16 },
                  // right: { md: 16 },
                  mt: { xs: 2, md: 0 },
                  width: 132,
                  height: 170,
                  border: "2px solid #ccc",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f5f5f5",
                  overflow: "hidden",
                }}
              >
                {photo ? (
                  <Avatar
                    src={photo as string}
                    alt="Student Photo"
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                    variant="square"
                  />
                ) : (
                  <label htmlFor="photo-upload">
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handlePhotoUpload}
                    />
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <PhotoCameraIcon
                        sx={{ fontSize: 40, cursor: "pointer" }}
                      />
                      <Typography variant="caption">.jpeg .jpg .png</Typography>
                    </Box>
                  </label>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Student Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Student Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="studentfullname"
              control={control}
              errors={errors}
              label="Student Name"
              rules={{
                required: "Required",
              }}
              variant="outlined"
              required
              disabled={submissionSuccess}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="dob"
              control={control}
              errors={errors}
              label="Date of Birth"
              rules={{
                required: "Required",
              }}
              variant="outlined"
              type="date"
              required
            />
          </Grid>

          {/* Guardian Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Guardian Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="guardianName"
              control={control}
              errors={errors}
              label="Guardian Name"
              rules={{
                required: "Required",
              }}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="contactNumber"
              control={control}
              errors={errors}
              label="Contact Number"
              rules={{
                required: "Required",
              }}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ControlledTextField
              name="email"
              control={control}
              errors={errors}
              label="Email"
              rules={{
                required: "Required",
              }}
              variant="outlined"
              type="email"
              required
            />
          </Grid>

          {/* Address Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Address Details</Typography>
          </Grid>
          <Grid item xs={12} display={"flex"} flexDirection={"column"}>
            <ControlledTextField
              name="addressline1"
              control={control}
              errors={errors}
              label="Address Line1"
              // value={formData?.studentObj.personalDetails.addressline1}
              rules={{
                required: "Required",
              }}
              variant="outlined"
              fullWidth
              required
            />

            <ControlledTextField
              name="addressline2"
              control={control}
              errors={errors}
              label="Address Line2"
              variant="outlined"
              // value={formData?.studentObj.personalDetails.addressline2}
              sx={{ mt: 1 }}
              fullWidth
            />

            <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
              <ControlledTextField
                name="addresscity"
                control={control}
                errors={errors}
                label="City"
                variant="outlined"
                // value={formData?.studentObj.personalDetails.addresscity}
                rules={{
                  required: "Required",
                }}
                fullWidth
                required
                sx={{ mr: 2 }}
              />

              <ControlledTextField
                name="addressstate"
                control={control}
                errors={errors}
                label="State"
                variant="outlined"
                // value={formData?.studentObj.personalDetails.addressstate}
                rules={{
                  required: "Required",
                }}
                fullWidth
                required
                sx={{ ml: 2, mr: 2 }}
              />

              <ControlledTextField
                name="addresspincode"
                control={control}
                errors={errors}
                label="Pincode"
                variant="outlined"
                //   value={
                //     formData?.studentObj.personalDetails.addresspincode
                //   }
                rules={{
                  required: "Required",
                }}
                fullWidth
                required
                sx={{ ml: 2 }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
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
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading
                ? "Saving..."
                : submissionSuccess
                ? "Saved"
                : "Save Application"}
            </MyCustomButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default NewAdmissionForm;
