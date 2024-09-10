import {
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const GuardianDetails = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  return (
    <Grid container spacing={2} sx={{ mt: -4 }}>
      {/* Father's Name */}
      <Grid item xs={12}>
        <Controller
          name="guardianname"
          control={control}
          rules={{ required: "required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                label="Guardian Name"
                variant="standard"
                size="small"
                fullWidth
                required
                {...field}
                error={Boolean(errors?.guardianname)}
                onBlur={() => trigger("guardianname")}
              />
            </>
          )}
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
          <InputLabel id="lblrelation" required>
            Relation with Student
          </InputLabel>
          <Controller
            name="studentrelation"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
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
        </FormControl>

        {/* Occupation */}
        <FormControl
          size="small"
          variant="standard"
          sx={{ width: "40%", mt: 0 }}
        >
          <InputLabel id="lbloccupation" required>
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
        </FormControl>
      </Grid>

      {/**Phone Number */}
      <Grid item xs={8}>
        <Controller
          name="guardianphoneno"
          control={control}
          rules={{ required: "required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                label="Phone Number"
                variant="standard"
                size="small"
                type="number"
                fullWidth
                required
                {...field}
                error={Boolean(errors?.guardianphoneno)}
                onBlur={() => trigger("guardianphoneno")}
              />
            </>
          )}
        />
      </Grid>

      {/**Email ID */}
      <Grid item xs={8}>
        <Controller
          name="guardianemailid"
          control={control}
          rules={{ required: "required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                label="Email ID"
                variant="standard"
                size="small"
                type="email"
                fullWidth
                required
                {...field}
                error={Boolean(errors?.guardianemailid)}
                onBlur={() => trigger("guardianemailid")}
              />
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default GuardianDetails;
