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

import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MyCustomButton } from "../../common/MyCustomControls";

const Header = () => {
  const [visible, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [tokenExpired, setTokenExpired] = useState<boolean>(true);
  const [tokenPresent, setTokenPresent] = useState(false);
  const [logoutTitle, setLogoutTitle] = useState<string>("Confirm Logout");
  const [logoutSubTitle, setLogoutSubTitle] = useState<string>(
    "Are you sure you want to logout?"
  );
  const [paymentCount, setPaymentCount] = useState<number>(0);

  const handleClickOpen = () => {
    console.log("Clicked open");
    setOpen(true);
  };

  const styleUnderline = {
    color: "rgb(255, 130, 92)",
    textUnderlinePosition: "under",
    textDecoration: "rgb(255, 130, 92) wavy underline",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleButton = () => {
    setVisibility(!visible);
  };
  const showLoginformHandler = () => {
    console.log("Login clicked");
  };

  const showLoginNewAdmission = () => {
    console.log("New Admission");
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
        <Box display={"flex"} flexDirection={"row"} gap={1}>
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
                  alignItems={"center"}
                >
                  <Typography variant="h3" mt={4}>
                    <strong>EDUERN</strong>
                  </Typography>
                  <Typography variant="caption" color="#cb3d64">
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
            <Col style={{ marginBottom: "2.5rem" }}>
              <Label onClick={toggleButton}>
                <Col span={12}>
                  <Menu>Menu</Menu>
                </Col>
                <Col span={12}>
                  <Outline />
                </Col>
              </Label>
            </Col>
            <MenuItem />
          </Drawer>
        </Container>
      </HeaderSection>
    </>
  );
};

export default Header;
