import * as React from "react";
import {
  TextField,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AcademicsDetails = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth);
  }
  const [classNum, setClassNum] = React.useState("");

  const handleChange = (event: any) => {
    setClassNum(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ mt: -4 }}>
        {/**Class, Section and Roll Number*/}
        <Grid
          item
          xs={12}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <FormControl size="small" variant="standard" fullWidth>
            <InputLabel id="lblclass" required>
              Class
            </InputLabel>
            <Select
              labelId="lblclass"
              id="class"
              value={classNum}
              label="Class"
              onChange={handleChange}
              sx={{ width: "80%" }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={10}>LKG</MenuItem>
              <MenuItem value={20}>UKG</MenuItem>
              <MenuItem value={30}>CLASS I</MenuItem>
              <MenuItem value={30}>CLASS II</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" variant="standard" fullWidth>
            <InputLabel id="demo-section-select-small-label" required>
              Section
            </InputLabel>
            <Select
              labelId="demo-section-select-small-label"
              id="demo-section-select-small"
              value={classNum}
              label="Section"
              onChange={handleChange}
              sx={{ width: "80%" }}
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={10}>Section A</MenuItem>
              <MenuItem value={20}>Section B</MenuItem>
              <MenuItem value={30}>Section C</MenuItem>
              <MenuItem value={30}>Section D</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Roll Number"
            variant="standard"
            size="small"
            type="number"
            required
          />
        </Grid>

        {/**House Name */}
        <Grid item xs={12}>
          <FormControl size="small" variant="standard" fullWidth>
            <InputLabel id="lblhousename" required>
              House Name
            </InputLabel>
            <Select
              labelId="lblhousename"
              id="housename"
              value={classNum}
              label="House Name"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={10}>House 1</MenuItem>
              <MenuItem value={20}>House 2</MenuItem>
              <MenuItem value={30}>House 3</MenuItem>
              <MenuItem value={30}>House 4</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Bus Number */}
        <Grid item xs={4}>
          <FormControl size="small" variant="standard" fullWidth>
            <InputLabel id="lblbusnumber" required>
              Bus Number
            </InputLabel>
            <Select
              labelId="lblbusnumber"
              id="busnumber"
              value={classNum}
              label="Bus Number"
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">
                <em>Select</em>
              </MenuItem>
              <MenuItem value={10}>Bus 1</MenuItem>
              <MenuItem value={20}>Bus 2</MenuItem>
              <MenuItem value={30}>Bus 3</MenuItem>
              <MenuItem value={30}>Bus 4</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default AcademicsDetails;
