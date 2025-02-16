import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { SvgIcon } from "../../../common/SvgIcon";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PersonIcon from "@mui/icons-material/Person";

const SchoolHeader = () => {
  const [photo, setPhoto] = useState<string | ArrayBuffer | null>(null);
  const [photofile, setPhotoFile] = useState<File>();

  // Handle photo upload
  const handlePhotoUpload = (event: any) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    // formData.append("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Box display={"flex"} flexDirection={"row"}>
      <SvgIcon src="vimlapandey.png" width="120px" height="80px" />
      <Box mt={{ xs: 2, sm: 0 }} textAlign={{ xs: "center" }} ml={6}>
        <Typography variant="h3" sx={{ color: "#333133" }}>
          <strong>V.P.M. GYAN NIKETAN SCHOOL</strong>
        </Typography>

        <Typography variant="body2" color="#d10057">
          Affiliated to C.B.S.E., Delhi (Affiliation no.: 3430175)
        </Typography>
        <Typography variant="body2" color="#4b4a54">
          <strong>
            Bairia, Daltonganj, Palamu, (Jharkhand) Contact No. 6205574800,
            7481021484
          </strong>
        </Typography>
        {/* <Typography variant="body2" color="#d10057">
              <strong>Email:</strong> founder@mosrewa.com,{" "}
              <strong>Website:</strong> maharajapublicschoolbela.com
            </Typography> */}
        <Typography variant="h5" p={1}>
          <strong>ADMISSION FORM</strong>
        </Typography>
        <Typography variant="body2" mt={-1}>
          Session 2024-25
        </Typography>
      </Box>
    </Box>
  );
};

export default SchoolHeader;
