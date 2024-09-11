import React, { useState } from "react";
import {
  TextField,
  Button,
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

const AdmissionAndPaymentForm = () => {
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
    <div>
      <Typography variant="h5" gutterBottom>
        Apply for Admission
      </Typography>
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
            <FormControl fullWidth required>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select labelId="gender-label" label="Gender">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="class-level-label">Class Applying For</InputLabel>
              <Select
                labelId="class-level-label"
                label="Class Applying For"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
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
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Parent/Guardian Contact"
              variant="outlined"
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
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Previous School Name"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Previous Class (if applicable)"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit Admission Application
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Fee Payment Form */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Fee Payment
      </Typography>
      <Box
        component="form"
        onSubmit={handlePaymentSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Student ID or Roll Number"
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="payment-method-label">Payment Method</InputLabel>
              <Select
                labelId="payment-method-label"
                label="Payment Method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="credit_card">Credit Card</MenuItem>
                <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                {/* Add other payment methods as needed */}
              </Select>
            </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <DatePicker
              label="Payment Date"
              value={paymentDate}
              onChange={(newValue: Dayjs | null) => setPaymentDate(newValue)}
              //   renderInput={(params: any) => (
              //     <TextField {...params} fullWidth required />
              //   )}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Transaction ID (if applicable)"
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Notes"
              multiline
              rows={3}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit Payment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AdmissionAndPaymentForm;
