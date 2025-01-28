import { Box, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { NavLink } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

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
          }}
        >
          <p style={{ fontSize: "0.9rem" }}>
            EDUERN
            <br />
            Aghore ashram, Sudna, Police line road <br />
            Daltonganj, Jharkhand - 822101 <br /> India
          </p>
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        textAlign={"center"}
        justifyContent="center"
        alignItems="center"
        ml={2}
        mt={-2.5}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: "#FFC000",
            opacity: 1,
            fontSize: "1.5em!",
          }}
        >
          <p>Help & Support</p>
        </Typography>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignItems="center"
          gap={1}
        >
          <CallIcon style={{ color: "#FF825B" }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              opacity: 1,
            }}
            alignSelf={"flex-start"}
          >
            +91 7319987746
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={"row"}
          justifyContent={"flex-start"}
          alignItems="center"
          gap={1}
        >
          <EmailIcon style={{ color: "#FF825B" }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 400,
              opacity: 1,
            }}
            alignSelf={"flex-start"}
          >
            eduern.official@gmail.com
          </Typography>
        </Box>
        {/* <Box display="flex" flexDirection="row">
          <FacebookIcon sx={{ marginRight: "20px" }} />
          <LinkedInIcon sx={{ marginRight: "20px" }} />

          <XIcon sx={{ marginRight: "20px" }} />
          <YouTubeIcon sx={{ marginRight: "20px" }} />
          <InstagramIcon />
        </Box> */}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        textAlign={"center"}
        mt={0.5}
        mb={2}
      >
        <Typography
          variant="h8"
          sx={{
            fontWeight: 300,
            opacity: 1,
            fontSize: "0.9em",
          }}
        >
          <NavLink to={"/privacy-policy"} target="_blank">
            Privacy Policy
          </NavLink>
          {" | "}
          <NavLink to={"/terms-conditions"} target="_blank">
            Terms & Conditions
          </NavLink>
        </Typography>
      </Box>
    </Box>
  );
}
