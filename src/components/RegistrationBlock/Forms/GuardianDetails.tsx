import {
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { UseFormRegister, FieldErrors, Controller } from "react-hook-form";

interface GuardianDetailsType {
  register: UseFormRegister<any>;
  control: any;
  errors: FieldErrors<any>;
  trigger: any;
}

const GuardianDetails: React.FC<GuardianDetailsType> = ({
  register,
  errors,
  control,
  trigger,
}) => {
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
          Parent/Guardian Details
        </Typography>
      </Box> */}
      <Grid container spacing={2} sx={{ mt: 0 }}>
        {/* Father's Name */}
        <Grid item xs={12}>
          {/* <TextField
          {...register("guardianname", { required: "required" })}
          label="Guardian Name"
          variant="standard"
          size="small"
          error={Boolean(errors?.guardianname)}
          fullWidth
          required
        /> */}

          <TextField
            {...register("guardianname", { required: "required" })}
            label="Guardian Name"
            variant="standard"
            size="small"
            error={Boolean(errors?.guardianname)}
            onBlur={() => trigger("guardianname")}
            helperText={errors?.guardianname?.message?.toString() || ""}
            fullWidth
            required
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
          <FormControl
            size="small"
            variant="standard"
            sx={{ width: "40%", mt: 0 }}
          >
            <InputLabel
              id="lblrelation"
              required
              error={Boolean(errors?.studentrelation)}
              onBlur={() => trigger("studentrelation")}
            >
              Relation with Student
            </InputLabel>
            <Controller
              name="studentrelation"
              control={control}
              rules={{ required: "required" }}
              render={({ field }) => (
                <>
                  <Select
                    labelId="lblrelation"
                    id="relation"
                    label="Relation"
                    {...field}
                    error={Boolean(errors?.studentrelation)}
                    onBlur={() => trigger("studentrelation")}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={"father"}>Father</MenuItem>
                    <MenuItem value={"mother"}>Mother</MenuItem>
                  </Select>
                </>
              )}
            />
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errors?.studentrelation?.message?.toString() || ""}
            </FormHelperText>
          </FormControl>

          {/* Occupation */}
          <FormControl
            size="small"
            variant="standard"
            sx={{ width: "40%", mt: 0 }}
          >
            <InputLabel
              id="lbloccupation"
              required
              error={Boolean(errors?.occupation)}
              onBlur={() => trigger("occupation")}
            >
              Occupation
            </InputLabel>
            <Controller
              name="occupation"
              control={control}
              rules={{ required: "required" }}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    labelId="lbloccupation"
                    id="occupation"
                    label="Occupation"
                    {...field}
                    error={Boolean(errors?.occupation)}
                    onBlur={() => trigger("occupation")}
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    <MenuItem value={"business"}>Business</MenuItem>
                    <MenuItem value={"service"}>Service</MenuItem>
                    <MenuItem value={"others"}>Others</MenuItem>
                  </Select>
                </>
              )}
            />
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {errors?.occupation?.message?.toString() || ""}
            </FormHelperText>
          </FormControl>
        </Grid>

        {/**Phone Number */}
        <Grid item xs={8}>
          <TextField
            {...register("guardianphoneno", {
              required: "required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits",
              },
            })}
            label="Phone Number"
            variant="standard"
            size="small"
            type="number"
            error={Boolean(errors?.guardianphoneno)}
            helperText={errors?.guardianphoneno?.message?.toString() || ""}
            onBlur={() => trigger("guardianphoneno")}
            fullWidth
            required
          />
        </Grid>

        {/**Email ID */}
        <Grid item xs={8}>
          <TextField
            {...register("guardianemailid", {
              required: "required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            label="Email ID"
            variant="standard"
            size="small"
            type="email"
            error={Boolean(errors?.guardianemailid)}
            helperText={errors?.guardianemailid?.message?.toString() || ""}
            fullWidth
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default GuardianDetails;
