import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function PageFooterMobile() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent={"center"}
      ml={4}
      mr={4}
      mb={3}
      mt={1}
      sx={{
        backgroundColor: "#f5f5f5",
        // borderRadius: '10px',
        boxShadow: 2,
        border: "none",
      }}
    >
      <Box display="flex" flexDirection="column" textAlign={"center"} p={0.5}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#FFC000",
            opacity: 1,
            fontSize: "1.5em",
          }}
        >
          <p>Reach Us</p>
        </Typography>
        <Typography
          variant="h8"
          sx={{
            opacity: 1,
            marginTop: -4,
            fontSize: "0.5em",
          }}
        >
          <p>
            EDUERN, 603, Brij Residency phase 2 <br />
            Shiv Vatika, Lasudia Mori <br />
            Indore, Madhya Pradesh 453771 <br /> India
          </p>
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        textAlign={"center"}
        ml={2}
        mt={-2.5}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#FFC000",
            opacity: 1,
            fontSize: "1.5em",
          }}
        >
          <p>Help & Support</p>
        </Typography>
        <Typography
          variant="h8"
          sx={{
            fontWeight: 400,
            opacity: 1,
            marginTop: -4,
            fontSize: "0.75em",
          }}
        >
          <p>whatsup@eduern.com or +91-9989847374</p>
        </Typography>
        <Typography
          variant="h7"
          sx={{
            fontWeight: 300,
            opacity: 1,
          }}
        >
          © 2024 SYYNER Technology
        </Typography>
        {/* <Box display="flex" flexDirection="row">
          <FacebookIcon sx={{ marginRight: "20px" }} />
          <LinkedInIcon sx={{ marginRight: "20px" }} />

          <XIcon sx={{ marginRight: "20px" }} />
          <YouTubeIcon sx={{ marginRight: "20px" }} />
          <InstagramIcon />
        </Box> */}
      </Box>

      <Box display="flex" flexDirection="column" textAlign={"center"} mt={0.5}>
        <Typography
          variant="h8"
          sx={{
            fontWeight: 300,
            opacity: 1,
          }}
        >
          Privacy Policy | Terms & Conditions
        </Typography>
      </Box>
    </Box>
  );
}
