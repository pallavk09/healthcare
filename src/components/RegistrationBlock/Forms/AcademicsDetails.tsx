import {
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const AcademicsDetails = () => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <Grid container spacing={2} sx={{ mt: -4 }}>
      {/**Class, Section and Roll Number*/}
      <Grid
        item
        xs={12}
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <FormControl
          size="small"
          variant="standard"
          sx={{ width: "30%", mt: 0 }}
        >
          <InputLabel id="lblclass" required>
            Class
          </InputLabel>
          <Controller
            name="class"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  labelId="lblclass"
                  id="class"
                  label="Class"
                  {...field}
                  error={Boolean(errors?.class)}
                  onBlur={() => trigger("class")}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"lkg"}>LKG</MenuItem>
                  <MenuItem value={"ukg"}>UKG</MenuItem>
                  <MenuItem value={"class-I"}>CLASS-I</MenuItem>
                </Select>
              </>
            )}
          />
        </FormControl>

        <FormControl
          size="small"
          variant="standard"
          sx={{ width: "30%", mt: 0 }}
        >
          <InputLabel id="lblsection" required>
            Section
          </InputLabel>
          <Controller
            name="section"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  labelId="lblsection"
                  id="section"
                  label="Section"
                  {...field}
                  error={Boolean(errors?.section)}
                  onBlur={() => trigger("section")}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"a"}>A</MenuItem>
                  <MenuItem value={"b"}>B</MenuItem>
                  <MenuItem value={"c"}>C</MenuItem>
                  <MenuItem value={"d"}>D</MenuItem>
                </Select>
              </>
            )}
          />
        </FormControl>

        <Controller
          name="rollnumber"
          control={control}
          rules={{ required: "required" }}
          render={({ field, fieldState }) => (
            <>
              <TextField
                sx={{ width: "30%", mt: 0 }}
                label="Roll Number"
                variant="standard"
                size="small"
                type="number"
                required
                {...field}
                error={Boolean(errors?.rollnumber)}
                onBlur={() => trigger("rollnumber")}
              />
            </>
          )}
        />
      </Grid>

      {/**House Name */}

      <Grid item xs={12}>
        <FormControl size="small" variant="standard" fullWidth>
          <InputLabel id="lblhousename" required>
            House Name
          </InputLabel>
          <Controller
            name="housename"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  labelId="lblhousename"
                  id="housename"
                  label="HouseName"
                  {...field}
                  error={Boolean(errors?.housename)}
                  onBlur={() => trigger("housename")}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"house1"}>House 1</MenuItem>
                  <MenuItem value={"house2"}>House 2</MenuItem>
                  <MenuItem value={"house3"}>House 3</MenuItem>
                  <MenuItem value={"house4"}>House 4</MenuItem>
                </Select>
              </>
            )}
          />
        </FormControl>
      </Grid>

      {/* Bus Number */}
      <Grid item xs={4}>
        <FormControl size="small" variant="standard" fullWidth>
          <InputLabel id="lblbusnumber" required>
            Bus Number
          </InputLabel>
          <Controller
            name="busnumber"
            control={control}
            rules={{ required: "required" }}
            render={({ field, fieldState }) => (
              <>
                <Select
                  labelId="lblbusnumber"
                  id="busnumber"
                  label="Busnumber"
                  {...field}
                  error={Boolean(errors?.busnumber)}
                  onBlur={() => trigger("busnumber")}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={"bus1"}>Bus 1</MenuItem>
                  <MenuItem value={"bus2"}>Bus 2</MenuItem>
                  <MenuItem value={"bus3"}>Bus 3</MenuItem>
                  <MenuItem value={"bus4"}>Bus 4</MenuItem>
                </Select>
              </>
            )}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default AcademicsDetails;
