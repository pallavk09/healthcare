import React, { useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Button } from "../../../common/Button";

const NewAdmissionForm = () => {
  const [dob, setDob] = useState<Dayjs | null>(null);
  const [classLevel, setClassLevel] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState<Dayjs | null>(null);

  // Handle form submissions
  const handleAdmissionSubmit = (e: any) => {
    e.preventDefault();
    // Process admission data here
  };

  const handlePaymentSubmit = (e: any) => {
    e.preventDefault();
    // Process payment data here
  };

  return (
    <Box p={1}>
      {/* <Typography variant="h5" gutterBottom>
        Apply for Admission
      </Typography> */}
      {/* Apply for Admission Form */}
      <Box
        component="form"
        onSubmit={handleAdmissionSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student Name"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <DatePicker
              label="Date of Birth"
              value={dob}
              onChange={(newValue: Dayjs | null) => setDob(newValue)}
              //   renderInput={(params: any) => (
              //     <TextField {...params} fullWidth required />
              //   )}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required size="small">
              <InputLabel id="gender-label" size="small">
                Gender
              </InputLabel>
              <Select labelId="gender-label" label="Gender" size="small">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required size="small">
              <InputLabel id="class-level-label" size="small">
                Class Applying For
              </InputLabel>
              <Select
                labelId="class-level-label"
                label="Class Applying For"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                size="small"
              >
                <MenuItem value="kindergarten">Kindergarten</MenuItem>
                <MenuItem value="1">1st Grade</MenuItem>
                <MenuItem value="2">2nd Grade</MenuItem>
                <MenuItem value="3">3rd Grade</MenuItem>
                {/* Add other classes as needed */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent/Guardian Name"
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent/Guardian Contact"
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              variant="outlined"
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Previous School Name"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Previous Class (if applicable)"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button max_width="100px">Apply</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NewAdmissionForm;
