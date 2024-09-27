import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import CustomDatePicker from "../../DatePicker";
import { UseFormRegister, FieldErrors, Controller } from "react-hook-form";
import React from "react";

interface StudentDetailsFormProps {
  register: UseFormRegister<any>;
  control: any;
  errors: FieldErrors<any>;
}

const StudentDetailsForm: React.FC<StudentDetailsFormProps> = ({
  register,
  control,
  errors,
}) => {
  // const {
  //   control,
  //   formState: { errors },
  //   trigger,
  // } = useFormContext();

  return (
    <>
      {/* <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={-3}
      >
        <Typography variant="h5" color="#cb3d64" fontWeight={"Bold"}>
          Student's Personal Details
        </Typography>
      </Box> */}

      <Grid container spacing={4} sx={{ mt: -3 }}>
        <Grid item xs={12}>
          <TextField
            {...register("studentfullname", {
              required: "required",
              // min: { value: 18, message: "Minimum age is 18" },
            })}
            label="Full Name"
            variant="standard"
            size="small"
            error={Boolean(errors?.studentfullname)}
            fullWidth
            required
          />
          {/* {errors?.studentfullname && <p>{errors.studentfullname?.message}</p>} */}
        </Grid>

        {/* Address */}
        <Grid item xs={12} display={"flex"} flexDirection={"column"}>
          <TextField
            {...register("addressline1", { required: "required" })}
            label="Address Line1"
            variant="standard"
            size="small"
            error={Boolean(errors?.addressline1)}
            required
          />
          <TextField
            {...register("addressline2", { required: "required" })}
            label="Address Line2"
            variant="standard"
            size="small"
            sx={{ mt: 1 }}
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
