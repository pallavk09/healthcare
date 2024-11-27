import { useState, useContext, useEffect } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        <Box
          display={"flex"}
          flexDirection={!isMobile ? "row" : "column"}
          gap={1}
        >
          <CustomNavLinkSmall onClick={() => scrollTo("aboutus")}>
            <Span>{"About"}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("ourservices")}>
            <Span>{"Services"}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("whyus")}>
            <Span>{"Why Us"}</Span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("contact")}>
            <Span>{"Get In Touch"}</Span>
          </CustomNavLinkSmall>
          {/* <MyCustomButton
            variant="contained"
            color="primary"
            onClick={showLoginformHandler}
          >
            Student Login
          </MyCustomButton>
          <MyCustomButton
            variant="contained"
            color="primary"
            onClick={showLoginNewAdmission}
          >
            Apply For Admission
          </MyCustomButton> */}
        </Box>
      </>
    );
  };

  return (
    <>
      <HeaderSection>
        <Container>
          <Row justify="space-between">
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              // ml={30}
            >
              <LogoContainer to="/" aria-label="homepage">
                {/* <SvgIcon src="logo.svg" width="101px" height="64px" /> */}
                {/* <SvgIcon
                  src="dummySchoolLogo.svg"
                  width="120px"
                  height="120px"
                /> */}
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={isMobile ? "flex-start" : "center"}
                  ml={isMobile ? 1 : 0}
                >
                  <Typography variant={!isMobile ? "h3" : "h4"} mt={4}>
                    <strong>EDUERN</strong>
                  </Typography>
                  <Typography
                    variant="caption"
                    color="#cb3d64"
                    fontSize={isMobile ? "0.5rem" : ""}
                  >
                    <strong>Education Easy, Reliable, and Networked</strong>
                  </Typography>
                </Box>
              </LogoContainer>
              {/* <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                mt={4}
              >
                <Typography variant="h4">
                  <strong>EDUERN</strong>
                </Typography>
              </Box> */}
            </Box>
            <NotHidden>
              <MenuItem />
            </NotHidden>
            <Burger onClick={toggleButton}>
              <Outline />
            </Burger>
          </Row>
          <Drawer closable={false} open={visible} onClose={toggleButton}>
            {/* <Col style={{ marginBottom: "1.5rem" }}>
              <Label onClick={toggleButton}>
                <Col span={8}>
                  <Menu>Menu</Menu>
                </Col>
                <Col span={12}>
                  <Outline />
                </Col>
              </Label>
            </Col> */}
            <MenuItem />
          </Drawer>
        </Container>
      </HeaderSection>
    </>
  );
};

export default Header;
