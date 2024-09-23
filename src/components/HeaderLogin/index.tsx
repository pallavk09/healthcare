import { Row } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { TFunction } from "i18next";
import { HeaderSection, LogoContainer } from "./styles";
import { Box, Typography } from "@mui/material";

const HeaderLogin = ({ t }: { t: TFunction }) => {
  return (
    <HeaderSection>
      <Container>
        <Box display={"flex"} flexDirection={"row"} justifyContent={"start"}>
          <LogoContainer to="/" aria-label="homepage">
            {/* <SvgIcon src="logo.svg" width="101px" height="64px" /> */}
            <SvgIcon src="dummySchoolLogo.svg" width="120px" height="120px" />
          </LogoContainer>
          <Typography variant="h4" fontWeight={"Bold"} mt={5}>
            M.K D.A.V Public School, Chianki, Daltonganj
          </Typography>
        </Box>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(HeaderLogin);
