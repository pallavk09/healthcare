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

const FeePaymentForm = () => {
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
      {/* Fee Payment Form */}
      <Typography variant="h5" gutterBottom>
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
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="payment-method-label" size="small">
                Payment Method
              </InputLabel>
              <Select
                labelId="payment-method-label"
                label="Payment Method"
                value={paymentMethod}
                size="small"
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
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Transaction ID (if applicable)"
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Additional Notes"
              multiline
              rows={3}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <Button max_width="108px">Pay Fee</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FeePaymentForm;
