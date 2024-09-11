import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "../../DatePicker";
import { Controller, useFormContext } from "react-hook-form";

const StudentDetailsForm = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <>
      {/* Student's Name */}
      <Grid container spacing={4} sx={{ mt: -4 }}>
        {/* <Grid item xs={12}>
          <Typography variant="h4">Personal Details</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <Controller
            name="studentfullname"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  label="Full Name"
                  variant="standard"
                  size="small"
                  fullWidth
                  required
                  {...field}
                  error={Boolean(errors?.studentfullname)}
                  onBlur={() => trigger("studentfullname")}
                />
                {/* {errors?.studentfullname?.message && (
                  <FormHelperText
                    error={Boolean(errors?.studentfullname)}
                  ></FormHelperText>
                )} */}
              </>
            )}
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} display={"flex"} flexDirection={"column"}>
          <Controller
            name="addressline1"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  label="Address Line1"
                  variant="standard"
                  size="small"
                  required
                  {...field}
                  error={Boolean(errors?.addressline1)}
                  onBlur={() => trigger("addressline1")}
                />
                {/* {errors?.addressline1?.message && (
                  <FormHelperText
                    error={Boolean(errors?.addressline1)}
                  ></FormHelperText>
                )} */}
              </>
            )}
          />

          <Controller
            name="addressline2"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <TextField
                  label="Address Line2"
                  variant="standard"
                  size="small"
                  sx={{ mt: 1 }}
                  {...field}
                  error={Boolean(errors?.addressline2)}
                  onBlur={() => trigger("addressline2")}
                />
                {/* {errors?.addressline2?.message && (
                  <FormHelperText
                    error={Boolean(errors?.addressline2)}
                  ></FormHelperText>
                )} */}
              </>
            )}
          />

          {/* <TextField label="Address Line2" variant="standard" size="small" /> */}
          <Grid display={"flex"} flexDirection={"row"} sx={{ mt: 1 }}>
            <Controller
              name="addresscity"
              control={control}
              rules={{ required: "required" }}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    label="City"
                    variant="standard"
                    size="small"
                    sx={{ mr: 2 }}
                    required
                    fullWidth
                    {...field}
                    error={Boolean(errors?.addresscity)}
                    onBlur={() => trigger("addresscity")}
                  />
                  {/* {errors?.addresscity?.message && (
                    <FormHelperText
                      error={Boolean(errors?.addresscity)}
                    ></FormHelperText>
                  )} */}
                </>
              )}
            />

            <Controller
              name="addressstate"
              control={control}
              rules={{ required: "required" }}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    label="State"
                    variant="standard"
                    size="small"
                    sx={{ ml: 2, mr: 2 }}
                    required
                    fullWidth
                    {...field}
                    error={Boolean(errors?.addressstate)}
                    onBlur={() => trigger("addressstate")}
                  />
                  {/* {errors?.addressstate?.message && (
                    <FormHelperText
                      error={Boolean(errors?.addressstate)}
                    ></FormHelperText>
                  )} */}
                </>
              )}
            />

            <Controller
              name="addresspincode"
              control={control}
              rules={{ required: "required" }}
              render={({ field, fieldState }) => (
                <>
                  <TextField
                    label="Pincode"
                    variant="standard"
                    size="small"
                    sx={{ ml: 2 }}
                    required
                    fullWidth
                    {...field}
                    error={Boolean(errors?.addresspincode)}
                    onBlur={() => trigger("addresspincode")}
                  />
                  {/* {errors?.addresspincode?.message && (
                    <FormHelperText
                      error={Boolean(errors?.addresspincode)}
                    ></FormHelperText>
                  )} */}
                </>
              )}
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
          sx={{ mt: 0 }}
        >
          <DatePicker format="DD-MM-YYYY" />

          {/* Gender */}
          <FormControl
            size="small"
            variant="standard"
            sx={{ width: "31%", mt: 0 }}
          >
            <InputLabel id="lblgender" required>
              Gender
            </InputLabel>
            <Controller
              name="studentgender"
              control={control}
              rules={{ required: "required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    labelId="lblgender"
                    id="gender"
                    label="Gender"
                    {...field}
                    error={Boolean(errors?.studentgender)}
                    onBlur={() => trigger("studentgender")}
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

export default StudentDetailsForm;
