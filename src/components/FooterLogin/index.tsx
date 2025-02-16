// import { withTranslation } from "react-i18next";

// import { TFunction } from "i18next";

import { FooterSection } from "./styles";
import { Box, Typography } from "@mui/material";

// const FooterLogin = ({ t }: { t: TFunction }) => {
const FooterLogin = () => {
  return (
    <>
      <FooterSection>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          sx={{
            alignContent: "center",
            alignItems: "center",
            background: "transparent",
          }}
        >
          <Typography variant="body2">
            Powered By <strong> Eduern</strong>
          </Typography>
        </Box>
      </FooterSection>
    </>
  );
};

export default FooterLogin;
