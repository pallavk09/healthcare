import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
// import { Button } from "../../common/Button";
import { TFunction } from "i18next";
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

import ApiContext from "../../store/context";
import {
  styled,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const MyCustomButton = styled(Button)(({ theme }) => ({
  fontFamily: "Motiva Sans Bold",
  fontSize: "0.80rem",
  fontWeight: "700",
  border: "1px solid #edf3f5",
  borderRadius: "4px",
  background: "#2e186a",
  boxShadow: "0 16px 30px rgb(23 31 114 / 20%)",
  marginTop: "0rem",
  "&:hover": {
    color: "#fff",
    border: "1px solid rgb(255, 130, 92)",
    backgroundColor: "rgb(255, 130, 92)",
  },
}));

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  console.log(`Location: ${location.pathname}`);

  const handleClickOpen = () => {
    console.log("Clicked open ");
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

  const newRegistrationHandler = () => {
    console.log(
      "Header. New Registration Handler function - CASE NEEDED TO BE HANDLED"
    );
    console.log(location);
    // navigate("/newadmission/");
  };

  const ctx = useContext(ApiContext);
  const navigate = useNavigate();

  const toggleButton = () => {
    setVisibility(!visible);
  };
  const showLoginformHandler = () => {
    console.log("Login clicked");
    navigate("student");
  };

  const showLoginNewAdmission = () => {
    console.log("New Admission");
    navigate("newadmission");
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem("token");
    ctx?.dispatch({
      type: "RESET_USER",
    });

    const loginRoute = location.pathname.startsWith("/newadmission")
      ? "/newadmission"
      : "/student";
    navigate(loginRoute);
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
        {!localStorage.getItem("token") ? (
          <>
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              {location.pathname.startsWith("/student") ||
              location.pathname.startsWith("/newadmission") ? (
                ""
              ) : (
                <>
                  <CustomNavLinkSmall onClick={() => scrollTo("about")}>
                    <Span>{t("About")}</Span>
                  </CustomNavLinkSmall>
                  <CustomNavLinkSmall onClick={() => scrollTo("product")}>
                    <Span>{t("Solutions")}</Span>
                  </CustomNavLinkSmall>
                </>
              )}
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={showLoginformHandler}
              >
                {t("Student Login")}
              </MyCustomButton>
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={showLoginNewAdmission}
              >
                {t("Apply For Admission")}
              </MyCustomButton>
            </Box>
          </>
        ) : (
          <>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                <Typography variant="h6">
                  <strong>Confirm Logout</strong>
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body2">
                    Are you sure you want to logout?
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MyCustomButton
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </MyCustomButton>
                <MyCustomButton
                  onClick={handleLogout}
                  variant="contained"
                  color="primary"
                  autoFocus
                >
                  Yes, Logout
                </MyCustomButton>
              </DialogActions>
            </Dialog>
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <CustomNavLinkSmall>
                <Span>My Dashboard</Span>
              </CustomNavLinkSmall>
              <CustomNavLinkSmall onClick={newRegistrationHandler}>
                <Span>"New Admission"</Span>
              </CustomNavLinkSmall>
              {/* <CustomNavLinkSmall>
                <Span>{t("Fees Payment")}</Span>
              </CustomNavLinkSmall> */}

              <MyCustomButton
                variant="contained"
                color="primary"
                endIcon={<LogoutIcon fontSize="medium" />}
                onClick={handleClickOpen}
              >
                {t("Logout")}
              </MyCustomButton>
            </Box>
          </>
        )}
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
                <SvgIcon
                  src="dummySchoolLogo.svg"
                  width="120px"
                  height="120px"
                />
              </LogoContainer>
              {localStorage.getItem("token") && (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  mt={4}
                >
                  <Typography variant="h4">
                    <strong>Maharaja Public School</strong>
                  </Typography>
                  <Typography variant="body2" color="#4b4a54">
                    <strong>
                      NH-30,Rewa-Satna Road, Bela Satna M.P.- 485115
                    </strong>
                  </Typography>
                </Box>
              )}
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

export default withTranslation()(Header);
