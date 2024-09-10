import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";

const SummaryPage = ({ registrationDetails }: any) => {
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  console.log("Inside Summary Page:", registrationDetails);
  console.log("studentdob: ", formatDate(registrationDetails.studentdob));
  const details = {
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St, Springfield",
    city: "Springfield",
    state: "IL",
    zipCode: "62704",
    phone: "555-555-5555",
    email: "johndoe@example.com",
  };
  return (
    <Box
      sx={{
        width: "100%", // Adjust the width as needed
        maxHeight: "55vh", // Set a maximum height for the content box
        overflowY: "auto", // Scroll vertically when content overflows
        paddingLeft: 1, // Add some padding for aesthetics
        paddingRight: 1, // Add some padding for aesthetics
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: 25, fontWeight: 600 }}
      >
        Personal Info
      </Typography>
      <Grid container spacing={2}>
        {/* First Row: First Name, Last Name, Address */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold" display="inline">
            First Name:
          </Typography>{" "}
          <Typography variant="body1" display="inline">
            {details.firstName}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            Last Name:
          </Typography>
          <Typography variant="body1">{details.lastName}</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            Address:
          </Typography>
          <Typography variant="body1">{details.address}</Typography>
        </Grid>

        {/* Second Row: City, State, Zip Code */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            City:
          </Typography>
          <Typography variant="body1">{details.city}</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            State:
          </Typography>
          <Typography variant="body1">{details.state}</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="body1" fontWeight="bold">
            Zip Code:
          </Typography>
          <Typography variant="body1">{details.zipCode}</Typography>
        </Grid>

        {/* Third Row: Phone, Email */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Phone:
          </Typography>
          <Typography variant="body1">{details.phone}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="body1" fontWeight="bold">
            Email:
          </Typography>
          <Typography variant="body1">{details.email}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryPage;
