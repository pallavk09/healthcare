import { Box, Grid, Typography } from "@mui/material";
import formatDate from "../../../common/utils/formatDate";
import { studentData } from "../../../common/types";

interface StudentDataPropsType {
  studentdata: studentData | null;
}

const SummaryPage: React.FC<StudentDataPropsType> = ({ studentdata }) => {
  // const ctx = useContext(ApiContext);
  console.log("Under Summary Page. Printing student Data");
  // console.log(ctx?.state.data);
  console.log(studentdata);

  return (
    <>
      {/* <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        mt={-3}
      >
        <Typography variant="h5" color="#cb3d64" fontWeight={"Bold"}>
          Please Review These Details
        </Typography>
      </Box> */}
      <Box
        sx={{
          mt: 2,
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
          sx={{ fontSize: 20, fontWeight: 600 }}
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
              {studentdata?.studentObj.personalDetails.studentfullname}
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
              {formatDate(studentdata?.studentObj.personalDetails.studentdob)}
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
              {studentdata?.studentObj.personalDetails.studentgender}
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
              {studentdata?.studentObj.personalDetails.addressline1}
            </Typography>
            <Typography variant="body1" sx={{ color: "#2B2B2B" }}>
              {studentdata?.studentObj.personalDetails.addressline2}
            </Typography>
            <Typography
              variant="body1"
              display={"inline"}
              sx={{ color: "#2B2B2B" }}
            >
              {studentdata?.studentObj.personalDetails.addresscity}
            </Typography>
            {","}
            <Typography
              variant="body1"
              display={"inline"}
              sx={{ color: "#2B2B2B" }}
            >
              {studentdata?.studentObj.personalDetails.addressstate}
            </Typography>
            {","}
            <Typography
              variant="body1"
              display={"inline"}
              sx={{ color: "#2B2B2B" }}
            >
              {studentdata?.studentObj.personalDetails.addresspincode}
            </Typography>
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ fontSize: 20, fontWeight: 600, mt: 2 }}
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
              {studentdata?.studentObj.guardianDetails.guardianname?.toUpperCase()}
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
              {studentdata?.studentObj.guardianDetails.studentrelation?.toUpperCase()}
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
              {studentdata?.studentObj.guardianDetails.occupation?.toUpperCase()}
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
              {studentdata?.studentObj.guardianDetails.guardianphoneno}
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
              {studentdata?.studentObj.guardianDetails.guardianemailid}
            </Typography>
          </Grid>
        </Grid>
        {!studentdata?.studentObj.newAdmission && (
          <>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: 20, fontWeight: 600, mt: 2 }}
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
                  {`${studentdata?.studentObj.academicsDetails.class!.toUpperCase()} - ${studentdata?.studentObj.academicsDetails.section!.toUpperCase()}`}
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
                  {studentdata?.studentObj.academicsDetails.rollnumber}
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
                  {studentdata?.studentObj.academicsDetails.housename?.toUpperCase()}
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
                  {studentdata?.studentObj.academicsDetails.busnumber?.toUpperCase()}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default SummaryPage;
