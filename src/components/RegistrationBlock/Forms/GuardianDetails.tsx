import * as React from "react";
import {
  TextField,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

const GuardianDetails = () => {
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
      <Grid container spacing={2} sx={{ mt: -4 }}>
        {/* Father's Name */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Guardian Name"
            variant="standard"
            size="small"
            required
          />
        </Grid>

        <Grid
          item
          xs={12}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ mt: 2, mb: -2 }}
        >
          {/* Relation with Student */}
          <FormControl>
            <FormLabel id="relation">Relation with Student</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                label="Father"
                value="father"
                control={<Radio size="small" />}
              />
              <FormControlLabel
                label="Mother"
                value="mother"
                control={<Radio size="small" />}
              />
            </RadioGroup>
          </FormControl>

          {/* Occupation */}
          <FormControl>
            <FormLabel id="occupation">Occupation</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                label="Business"
                value="business"
                control={<Radio size="small" />}
              />
              <FormControlLabel
                label="Service"
                value="service"
                control={<Radio size="small" />}
              />
              <FormControlLabel
                label="Others"
                value="others"
                control={<Radio size="small" />}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        {/**Phone Number */}
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Phone Number"
            variant="standard"
            size="small"
            type="number"
            required
          />
        </Grid>

        {/**Email ID */}
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Email ID"
            variant="standard"
            size="small"
            type="email"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default GuardianDetails;
