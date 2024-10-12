import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Avatar,
  FormHelperText,
} from "@mui/material";
import CustomDatePicker from "../../DatePicker";
import {
  UseFormRegister,
  FieldErrors,
  Controller,
  UseFormSetValue,
  FieldValues,
} from "react-hook-form";
import React, { useEffect, useState } from "react";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";

interface StudentDetailsFormProps {
  register: UseFormRegister<any>;
  control: any;
  errors: FieldErrors<any>;
  setValue?: UseFormSetValue<FieldValues>;
  photo?: string | null; // Pass photo URL as prop
  onPhotoUpload?: (file: File) => void; // Callback for file upload
  trigger: any;
}

const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({
  register,
  control,
  errors,
  setValue,
  photo, // Photo URL from parent
  onPhotoUpload, // Callback for file upload
  trigger,
}) => {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Inside handlePhotoUpload");
    console.log(e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file && setValue) {
      setValue("studentphoto", file); // Store file in react-hook-form
      if (onPhotoUpload) onPhotoUpload(file); // Call parent callback to update photo state
    }
  };

  // useEffect(() => {
  //   trigger("studentphoto");
  // }, [trigger]);
  return (
    <>
      <Grid container spacing={4} sx={{ mt: -3 }}>
        <Grid item xs={9}>
          <TextField
            {...register("studentfullname", {
              required: "required",
              // min: { value: 18, message: "Minimum age is 18" },
            })}
            label="Full Name"
            variant="standard"
            size="small"
            error={Boolean(errors?.studentfullname)}
            helperText={errors?.studentfullname?.message?.toString() || ""}
            fullWidth
            required
          />
          {/* {errors?.studentfullname && (
            <p>{errors.studentfullname?.message?.toString()}</p>
          )} */}
        </Grid>
        {/* Photo */}
        <Grid item xs={2}>
          <Box
            sx={{
              position: { xs: "static", md: "absolute" },
              top: { md: 16 },
              right: { md: 16 },
              mt: { xs: 2, md: 0 },
              width: 132,
              height: 150,
              border: "2px solid #ccc",
              borderRadius: 0,
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
                        opacity: 1, // Show icon on hover
                      },
                    }}
                    onClick={() => {
                      console.log("Photo there, clicked to change");
                      let element = document.getElementById("photo-upload");
                      console.log(element);
                      document.getElementById("photo-upload")?.click();
                    }} // Trigger file input on click
                  >
                    <PhotoCameraIcon sx={{ color: "white", fontSize: 40 }} />
                  </Box>
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
                        opacity: 1, // Show icon on hover
                      },
                    }}
                    onClick={() => {
                      console.log("Photo NOT there, clicked to change");
                      document.getElementById("photo-upload")?.click();
                    }}
                    // Trigger file input on click
                  >
                    <PhotoCameraIcon sx={{ color: "white", fontSize: 40 }} />
                  </Box>
                  <input
                    {...register("studentphoto", {
                      required: "Photo is required",
                    })}
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                  />
                </>
              )}
            </Box>

            {/* {photo ? (
              <Avatar
                src={photo as string}
                alt="Student Photo"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                variant="square"
              />
            ) : (
              <label htmlFor="photo-upload">
                <input
                  {...register("studentphoto", {
                    required: "Photo is required",
                    // min: { value: 18, message: "Minimum age is 18" },
                  })}
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
                  <PhotoCameraIcon sx={{ fontSize: 40, cursor: "pointer" }} />
                  <Typography variant="caption">.jpeg .jpg .png</Typography>
                </Box>
              </label>
            )} */}
          </Box>
        </Grid>

        {/* Address */}
        <Grid item xs={12} display={"flex"} flexDirection={"column"}>
          <TextField
            {...register("addressline1", { required: "required" })}
            label="Address Line1"
            variant="standard"
            size="small"
            error={Boolean(errors?.addressline1)}
            helperText={errors?.addressline1?.message?.toString() || ""}
            required
            sx={{
              width: "80%",
            }}
          />
          <TextField
            // {...register("addressline2", { required: "required" })}
            label="Address Line2"
            variant="standard"
            size="small"
            sx={{ mt: 1, width: "80%" }}
          />

          {/* <TextField label="Address Line2" variant="standard" size="small" /> */}
          <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
            <TextField
              {...register("addresscity", { required: "required" })}
              label="City"
              variant="standard"
              size="small"
              sx={{ mr: 2 }}
              error={Boolean(errors?.addresscity)}
              helperText={errors?.addresscity?.message?.toString() || ""}
              required
              fullWidth
            />
            <TextField
              {...register("addressstate", { required: "required" })}
              label="State"
              variant="standard"
              size="small"
              sx={{ ml: 2, mr: 2 }}
              error={Boolean(errors?.addressstate)}
              helperText={errors?.addressstate?.message?.toString() || ""}
              required
              fullWidth
            />
            <TextField
              {...register("addresspincode", { required: "required" })}
              label="Pincode"
              variant="standard"
              size="small"
              sx={{ ml: 2 }}
              error={Boolean(errors?.addresspincode)}
              helperText={errors?.addresspincode?.message?.toString() || ""}
              required
              fullWidth
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
            name="studentdob"
            label="Date of Birth"
            control={control}
            errors={errors}
            rules={{ required: "required" }}
          />

          {/* Gender */}
          <FormControl
            size="small"
            variant="standard"
            sx={{ width: "31%", mt: 2, ml: 3 }}
          >
            <InputLabel
              id="lblgender"
              error={Boolean(errors?.studentgender)}
              required
            >
              Gender
            </InputLabel>
            <Controller
              name="studentgender"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <>
                  <Select
                    labelId="lblgender"
                    id="gender"
                    label="Gender"
                    {...field}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </>
              )}
            />
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errors?.studentgender?.message?.toString() || ""}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

// import {
//   TextField,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import DatePicker from "../../DatePicker";
// import { Controller, useFormContext } from "react-hook-form";

// const StudentDetailsForm = () => {
//   const {
//     control,
//     formState: { errors },
//     trigger,
//   } = useFormContext();

//   return (
//     <>
//       {/* Student's Name */}
//       <Grid container spacing={4} sx={{ mt: -4 }}>
//         {/* <Grid item xs={12}>
//           <Typography variant="h4">Personal Details</Typography>
//         </Grid> */}
//         <Grid item xs={12}>
//           <Controller
//             name="studentfullname"
//             control={control}
//             rules={{ required: "required" }}
//             render={({ field, fieldState }) => (
//               <>
//                 <TextField
//                   label="Full Name"
//                   variant="standard"
//                   size="small"
//                   fullWidth
//                   required
//                   {...field}
//                   error={Boolean(errors?.studentfullname)}
//                   onBlur={() => trigger("studentfullname")}
//                 />
//                 {/* {errors?.studentfullname?.message && (
//                   <FormHelperText
//                     error={Boolean(errors?.studentfullname)}
//                   ></FormHelperText>
//                 )} */}
//               </>
//             )}
//           />
//         </Grid>

//         {/* Address */}
//         <Grid item xs={12} display={"flex"} flexDirection={"column"}>
//           <Controller
//             name="addressline1"
//             control={control}
//             rules={{ required: "required" }}
//             render={({ field, fieldState }) => (
//               <>
//                 <TextField
//                   label="Address Line1"
//                   variant="standard"
//                   size="small"
//                   required
//                   {...field}
//                   error={Boolean(errors?.addressline1)}
//                   onBlur={() => trigger("addressline1")}
//                 />
//                 {/* {errors?.addressline1?.message && (
//                   <FormHelperText
//                     error={Boolean(errors?.addressline1)}
//                   ></FormHelperText>
//                 )} */}
//               </>
//             )}
//           />

//           <Controller
//             name="addressline2"
//             control={control}
//             render={({ field, fieldState }) => (
//               <>
//                 <TextField
//                   label="Address Line2"
//                   variant="standard"
//                   size="small"
//                   sx={{ mt: 1 }}
//                   {...field}
//                   error={Boolean(errors?.addressline2)}
//                   onBlur={() => trigger("addressline2")}
//                 />
//                 {/* {errors?.addressline2?.message && (
//                   <FormHelperText
//                     error={Boolean(errors?.addressline2)}
//                   ></FormHelperText>
//                 )} */}
//               </>
//             )}
//           />

//           {/* <TextField label="Address Line2" variant="standard" size="small" /> */}
//           <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
//             <Controller
//               name="addresscity"
//               control={control}
//               rules={{ required: "required" }}
//               render={({ field, fieldState }) => (
//                 <>
//                   <TextField
//                     label="City"
//                     variant="standard"
//                     size="small"
//                     sx={{ mr: 2 }}
//                     required
//                     fullWidth
//                     {...field}
//                     error={Boolean(errors?.addresscity)}
//                     onBlur={() => trigger("addresscity")}
//                   />
//                   {/* {errors?.addresscity?.message && (
//                     <FormHelperText
//                       error={Boolean(errors?.addresscity)}
//                     ></FormHelperText>
//                   )} */}
//                 </>
//               )}
//             />

//             <Controller
//               name="addressstate"
//               control={control}
//               rules={{ required: "required" }}
//               render={({ field, fieldState }) => (
//                 <>
//                   <TextField
//                     label="State"
//                     variant="standard"
//                     size="small"
//                     sx={{ ml: 2, mr: 2 }}
//                     required
//                     fullWidth
//                     {...field}
//                     error={Boolean(errors?.addressstate)}
//                     onBlur={() => trigger("addressstate")}
//                   />
//                   {/* {errors?.addressstate?.message && (
//                     <FormHelperText
//                       error={Boolean(errors?.addressstate)}
//                     ></FormHelperText>
//                   )} */}
//                 </>
//               )}
//             />

//             <Controller
//               name="addresspincode"
//               control={control}
//               rules={{ required: "required" }}
//               render={({ field, fieldState }) => (
//                 <>
//                   <TextField
//                     label="Pincode"
//                     variant="standard"
//                     size="small"
//                     sx={{ ml: 2 }}
//                     required
//                     fullWidth
//                     {...field}
//                     error={Boolean(errors?.addresspincode)}
//                     onBlur={() => trigger("addresspincode")}
//                   />
//                   {/* {errors?.addresspincode?.message && (
//                     <FormHelperText
//                       error={Boolean(errors?.addresspincode)}
//                     ></FormHelperText>
//                   )} */}
//                 </>
//               )}
//             />
//           </Grid>
//         </Grid>

//         {/* DOB and Gender */}
//         <Grid
//           item
//           xs={12}
//           display={"flex"}
//           flexDirection={"row"}
//           justifyContent={"normal"}
//           sx={{ mt: 0 }}
//         >
//           <DatePicker format="DD-MM-YYYY" />

//           {/* Gender */}
//           <FormControl
//             size="small"
//             variant="standard"
//             sx={{ width: "31%", mt: 0 }}
//           >
//             <InputLabel id="lblgender" required>
//               Gender
//             </InputLabel>
//             <Controller
//               name="studentgender"
//               control={control}
//               rules={{ required: "required" }}
//               render={({ field, fieldState }) => (
//                 <>
//                   <Select
//                     labelId="lblgender"
//                     id="gender"
//                     label="Gender"
//                     {...field}
//                     error={Boolean(errors?.studentgender)}
//                     onBlur={() => trigger("studentgender")}
//                   >
//                     <MenuItem value="">
//                       <em>Select</em>
//                     </MenuItem>
//                     <MenuItem value={"Male"}>Male</MenuItem>
//                     <MenuItem value={"Female"}>Female</MenuItem>
//                     <MenuItem value={"Other"}>Other</MenuItem>
//                   </Select>
//                 </>
//               )}
//             />
//           </FormControl>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

export default StudentDetailsForm;
