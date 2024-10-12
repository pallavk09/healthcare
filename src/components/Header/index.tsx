import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { TFunction } from "i18next";
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

import ApiContext from "../../store/context";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Badge,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { MyCustomButton } from "../../common/MyCustomControls";
import { checkTokenExpiry } from "../../common/utils/checkTokenExpiry";
import { feePaymentContext } from "../../store/cartContext";
import { jwtDecode } from "jwt-decode";
import userDataContext from "../../store/userContext";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const [dialogShown, setDialogShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [locationPath, setLocationPath] = useState<string>("");
  const [tokenExpired, setTokenExpired] = useState<boolean>(true);
  const [tokenPresent, setTokenPresent] = useState(false);
  const [logoutTitle, setLogoutTitle] = useState<string>("Confirm Logout");
  const [logoutSubTitle, setLogoutSubTitle] = useState<string>(
    "Are you sure you want to logout?"
  );
  const [paymentCount, setPaymentCount] = useState<number>(0);

  const [_userId, setUserId] = useState<string | undefined>();
  const [_phone, setPhone] = useState<string | undefined>();
  const ctx_userData = useContext(userDataContext);

  const location = useLocation();
  const fee_context = useContext(feePaymentContext);

  useEffect(() => {
    console.log("Under useEffect of Registration .");
    // const userId = params.userId;
    // console.log(ctx?.state);
    console.log(ctx_userData?.user_state);
    const accessToken = localStorage.getItem("token");
    console.log(accessToken);

    if (ctx_userData?.user_state.phone && ctx_userData?.user_state.userId) {
      console.log("Phone and userId already present in context");
      setPhone(ctx_userData?.user_state.phone);
      setUserId(ctx_userData?.user_state.userId);
    } else if (accessToken) {
      console.log("Phone and userId not there in context");
      console.log("Token found. Updating context");
      const accessToken_decode = jwtDecode(accessToken) as {
        phone: string;
        userId: string;
      };
      console.log("Token found. Decoded");
      console.log(accessToken_decode);
      setPhone(accessToken_decode.phone);
      setUserId(accessToken_decode.userId);
      ctx_userData?.user_dispatch({
        type: "UPDATE_USER_LOGGEDIN",
        payload: {
          phone: accessToken_decode.phone,
          userId: accessToken_decode.userId,
        },
      });
    } else {
      console.log("Token not found. Logging out");
      navigate("/student");
    }
  }, []);

  useEffect(() => {
    console.log("Inside useEffect of Header. locationPath");
    console.log(`Location: ${location.pathname}`);
    const token = localStorage.getItem("token");
    if (token) {
      setTokenPresent(true);
      const tokenExpired = checkTokenExpiry(token);
      if (tokenExpired && !dialogShown) {
        setLogoutTitle("Your session has been expired");
        setLogoutSubTitle("Please logout and re-login");
        setDialogShown(true);
      }
      setTokenExpired(tokenExpired);
      setLocationPath(location.pathname);
    } else {
      setTokenPresent(false);
    }
  }, [location, dialogShown]);

  useEffect(() => {
    console.log("Inside useEffect for Cart");
    console.log(fee_context?.state_Fee_payment);
    const paymentState = fee_context?.state_Fee_payment;
    setPaymentCount((prev) =>
      paymentState && paymentState.length > prev ? prev + 1 : prev
    );
  }, [fee_context?.state_Fee_payment]);

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

  const newRegistrationHandler = () => {
    console.log(
      "Header. New Registration Handler function - CASE NEEDED TO BE HANDLED"
    );
    console.log(location);
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
    localStorage.removeItem("token");

    ctx?.dispatch({
      type: "RESET_USER",
    });
    handleClose();

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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h6">
              <strong>{logoutTitle}</strong>
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography variant="body1">{logoutSubTitle}</Typography>
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
        {tokenPresent ? (
          tokenExpired ? (
            handleClickOpen()
          ) : location.pathname.startsWith("/newadmission") ? (
            <>
              {/* <Box display={"flex"} mr={2}>
                <Tooltip title="My Payments">
                  <Link to="/makepayment">
                    <Badge badgeContent={4} color="primary">
                      <ShoppingCartOutlinedIcon fontSize="large" />
                    </Badge>
                  </Link>
                </Tooltip>
              </Box> */}
              <MyCustomButton
                variant="contained"
                color="primary"
                endIcon={<LogoutIcon fontSize="medium" />}
                onClick={handleClickOpen}
              >
                Logout
              </MyCustomButton>
            </>
          ) : location.pathname.startsWith("/student") ? (
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <CustomNavLinkSmall>
                <strong>
                  <Span>MY DASHBOARD</Span>
                </strong>
              </CustomNavLinkSmall>
              {/* <Box display={"flex"} mr={2} sx={{ cursor: "pointer" }}>
                <Tooltip title="My Payments">
                  <Link to={`/student/${_userId}/paymentcart`}>
                    <Badge badgeContent={paymentCount} color="primary">
                      <ShoppingCartOutlinedIcon fontSize="large" />
                    </Badge>
                  </Link>
                </Tooltip>
              </Box> */}
              <MyCustomButton
                variant="contained"
                color="primary"
                endIcon={<LogoutIcon fontSize="medium" />}
                onClick={handleClickOpen}
              >
                Logout
              </MyCustomButton>
            </Box>
          ) : location.pathname === "/" ? (
            <Box display={"flex"} flexDirection={"row"} gap={1}>
              <CustomNavLinkSmall onClick={() => scrollTo("about")}>
                <Span>{t("About")}</Span>
              </CustomNavLinkSmall>
              <CustomNavLinkSmall onClick={() => scrollTo("product")}>
                <Span>{t("Solutions")}</Span>
              </CustomNavLinkSmall>
              <MyCustomButton
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
              </MyCustomButton>
            </Box>
          ) : (
            ""
          )
        ) : (
          <Box display={"flex"} flexDirection={"row"} gap={1}>
            {location.pathname === "/" && (
              <>
                <CustomNavLinkSmall onClick={() => scrollTo("about")}>
                  <Span>About</Span>
                </CustomNavLinkSmall>
                <CustomNavLinkSmall onClick={() => scrollTo("product")}>
                  <Span>Solutions</Span>
                </CustomNavLinkSmall>
              </>
            )}

            {(location.pathname === "/" ||
              location.pathname === "/student") && (
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={showLoginformHandler}
              >
                Student Login
              </MyCustomButton>
            )}

            {(location.pathname === "/" ||
              location.pathname === "/newadmission") && (
              <MyCustomButton
                variant="contained"
                color="primary"
                onClick={showLoginNewAdmission}
              >
                Apply For Admission
              </MyCustomButton>
            )}
          </Box>
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
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                mt={4}
              >
                {location.pathname === "/" ? (
                  <>
                    <Typography variant="h4">
                      <strong>LOGO WILL COME HERE</strong>
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="h4">
                      <strong>Maharaja Public School</strong>
                    </Typography>
                    <Typography variant="body2" color="#4b4a54">
                      <strong>
                        NH-30,Rewa-Satna Road, Bela Satna M.P.- 485115
                      </strong>
                    </Typography>
                  </>
                )}
              </Box>
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
