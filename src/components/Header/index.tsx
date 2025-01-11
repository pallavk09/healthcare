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
  CloseIcon,
} from "./styles";

import { Box, Divider, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const [visible, setVisibility] = useState(false);
  const [showMenus, setShowMenus] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    console.log("pathname", pathname);
    if (
      !pathname.includes("privacy-policy") ||
      !pathname.includes("terms-conditions")
    )
      setShowMenus(true);
  }, []);

  useEffect(() => {
    console.log("pathname", pathname);
    if (
      pathname.includes("privacy-policy") ||
      pathname.includes("terms-conditions")
    )
      setShowMenus(false);
  }, [pathname]);
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

  const MenuItemMobile = () => {
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
          flexDirection={"column"}
          justifyContent={"left"}
          alignItems={"left"}
        >
          <LogoContainer to="/" aria-label="homepage">
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems="center"
              // alignItems={isMobile ? "flex-start" : "center"}
              ml={isMobile ? 1 : 0}
            >
              <img
                src={`/img/svg/eduern-logov2.svg`}
                alt={"eduern-logov2.svg"}
                width="150px"
                height="80px"
                style={{
                  marginLeft: -15,
                }}
              />
              {/* <Typography
                variant={!isMobile ? "h3" : "h4"}
                mt={4}
                color="#FF825B"
              >
                <strong>Eduern</strong>
              </Typography>
              <Typography
                variant="caption"
                color="#2E186A"
                fontSize={isMobile ? "0.5rem" : ""}
              >
                <strong>Education Easy, Reliable, & Networked</strong>
              </Typography> */}
            </Box>
          </LogoContainer>
          <CustomNavLinkSmall onClick={() => scrollTo("aboutus")}>
            About
            <span>
              <Divider
                style={{
                  color: "#FF825B",
                  border: "0.5px solid",
                  marginTop: "0.4rem",
                }}
              />
            </span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("ourservices")}>
            Services
            <span>
              <Divider
                style={{
                  color: "#FF825B",
                  border: "0.5px solid",
                  marginTop: "0.4rem",
                }}
              />
            </span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("whyus")}>
            Why Us
            <span>
              <Divider
                style={{
                  color: "#FF825B",
                  border: "0.5px solid",
                  marginTop: "0.4rem",
                }}
              />
            </span>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall onClick={() => scrollTo("contact")}>
            Get In Touch
            <span>
              <Divider
                style={{
                  color: "#FF825B",
                  border: "0.5px solid",
                  marginTop: "0.4rem",
                }}
              />
            </span>
          </CustomNavLinkSmall>
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
                <Box display={"flex"} flexDirection={"row"}>
                  <Box>
                    <img
                      src={`/img/svg/eduern-logov2.svg`}
                      alt={"eduern-logov2.svg"}
                      width={!isMobile ? "310px" : "200px"}
                      height={!isMobile ? "200px" : "110px"}
                      style={
                        !isMobile
                          ? {
                              marginLeft: -40,
                              marginTop: -20,
                              marginBottom: -70,
                            }
                          : {}
                      }
                    />
                  </Box>
                  {/* <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={isMobile ? "flex-start" : "center"}
                    ml={isMobile ? 1 : 0}
                  >
                    <Typography
                      variant={!isMobile ? "h3" : "h4"}
                      mt={4}
                      color="#FF825B"
                    >
                      <strong>Eduern</strong>
                    </Typography>
                    <Typography
                      variant="caption"
                      color="#2E186A"
                      fontSize={isMobile ? "0.5rem" : ""}
                    >
                      Education Easy, Reliable, & Networked
                    </Typography>
                  </Box> */}
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
            {showMenus && (
              <NotHidden>
                <MenuItem />
              </NotHidden>
            )}
            {/* <Burger onClick={toggleButton} open={visible}> */}
            {showMenus && (
              <Burger onClick={toggleButton}>
                {/* <div />
              <div />
              <div /> */}
                {visible ? <CloseIcon /> : <Outline />}
              </Burger>
            )}
          </Row>
          <Drawer
            closable={false}
            open={visible}
            onClose={toggleButton}
            placement="left"
          >
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
            {/* <MenuItem /> */}
            <MenuItemMobile />
          </Drawer>
        </Container>
      </HeaderSection>
    </>
  );
};

export default Header;
