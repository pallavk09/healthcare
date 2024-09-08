import * as React from "react";
import {
  TextField,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import DatePicker from "../../DatePicker";

const StudentDetailsForm = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log(firstName, lastName, email, dateOfBirth);
  }
  return (
    <form onSubmit={handleSubmit}>
      {/* Student's Name */}
      <Grid container spacing={4} sx={{ mt: -4 }}>
        {/* <Grid item xs={12}>
          <Typography variant="h4">Personal Details</Typography>
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            label="Full Name"
            variant="standard"
            size="small"
            fullWidth
            required
          />
        </Grid>

        {/* Address */}
        <Grid item xs={12} display={"flex"} flexDirection={"column"}>
          <TextField
            label="Address Line1"
            variant="standard"
            size="small"
            required
          />
          <TextField
            label="Address Line2"
            variant="standard"
            size="small"
            required
          />
          <Grid display={"flex"} flexDirection={"row"}>
            <TextField
              label="City"
              variant="standard"
              size="small"
              sx={{ mr: 2 }}
              required
              fullWidth
            />
            <TextField
              label="State"
              variant="standard"
              size="small"
              sx={{ ml: 2, mr: 2 }}
              required
              fullWidth
            />
            <TextField
              label="Pincode"
              variant="standard"
              size="small"
              sx={{ ml: 2 }}
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
          justifyContent={"space-between"}
        >
          <DatePicker format="DD-MM-YYYY" />

          {/* Gender */}
          <FormControl sx={{ mr: 8 }}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="male"
                control={<Radio size="small" />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio size="small" />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio size="small" />}
                label="Others"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentDetailsForm;
