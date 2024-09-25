import { withTranslation } from "react-i18next";

import { TFunction } from "i18next";

import { FooterSection } from "./styles";
import { Box, Typography } from "@mui/material";

const FooterLogin = ({ t }: { t: TFunction }) => {
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
          }}
        >
          <Typography variant="body2">
            Powered By <strong> Asaan</strong>
          </Typography>
        </Box>
      </FooterSection>
    </>
  );
};

export default withTranslation()(FooterLogin);
