import { Box, Grid, Typography } from "@mui/material";
// import { useContext } from "react";
// import ApiContext from "../../../store/context";
import formatDate from "../../../common/utils/formatDate";
import { studentData } from "../../../common/types";

interface StudentDataPropsType {
  studentdata: studentData | null;
}

const SummaryPage: React.FC<StudentDataPropsType> = ({ studentdata }) => {
  // const ctx = useContext(ApiContext);
  console.log("Under Summary Page");
  // console.log(ctx?.state.data);

  return (
    <Box
      sx={{
        width: "100%", // Adjust the width as needed
        maxHeight: "55vh", // Set a maximum height for the content box
        overflowY: "auto", // Scroll vertically when content overflows
        paddingLeft: 1, // Add some padding for aesthetics
        paddingRight: 1, // Add some padding for aesthetics
        "&::-webkit-scrollbar": {
          width: "8px", // Width of the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1", // Background of the scrollbar track
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Color of the scroll thumb
          borderRadius: "10px", // Rounded corners
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // Darker color on hover for the thumb
        },
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: 27, fontWeight: 600 }}
      >
        Personal Info
      </Typography>
      <Grid container spacing={2}>
        {/* First Row: Full Name */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Full Name:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {/* {studentdata?.studentfullname} */}
            {studentdata?.studentfullname}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            DOB:
          </Typography>{" "}
          <Typography
            variant="body1"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            {/* {formatDate(studentdata?.studentdob!)} */}
            {formatDate(studentdata?.studentdob)}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            display={"inline"}
            fontWeight="bold"
            sx={{ color: "#2B2B2B" }}
          >
            Gender:
          </Typography>{" "}
          <Typography
            variant="body1"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            {/* {studentdata?.studentgender} */}
            {studentdata?.studentgender}
          </Typography>
        </Grid>

        {/* Second Row: Address */}
        <Grid item xs={12} sm={12}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: "#2B2B2B" }}
          >
            Address:
          </Typography>{" "}
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            {studentdata?.addressline1}
          </Typography>
          <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
            {studentdata?.addressline2}
          </Typography>
          <Typography
            variant="body1"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.addresscity}
          </Typography>
          {","}
          <Typography
            variant="body1"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.addressstate}
          </Typography>
          {","}
          <Typography
            variant="body1"
            display={"inline"}
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.addresspincode}
          </Typography>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: 27, fontWeight: 600, mt: 2 }}
      >
        Guardian Info
      </Typography>
      <Grid container spacing={2}>
        {/* First Row: Guardian Name */}
        <Grid item xs={12} sm={8}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Guardian Name:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.guardianname?.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Relation:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.studentrelation?.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Occupation:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.occupation?.toUpperCase()}
          </Typography>
        </Grid>
        {/* Second Row: Phone and Email */}
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Phone No:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.guardianphoneno}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Email ID:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.guardianemailid}
          </Typography>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontSize: 27, fontWeight: 600, mt: 2 }}
      >
        Academics
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Studying in:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {`${studentdata?.class!.toUpperCase()} - ${studentdata?.section!.toUpperCase()}`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Roll No:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.rollnumber}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            House Name:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.housename?.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            Bus Number:
          </Typography>{" "}
          <Typography
            variant="body1"
            display="inline"
            sx={{ color: "#2B2B2B" }}
          >
            {studentdata?.busnumber?.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SummaryPage;
