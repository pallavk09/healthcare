import { useState, useRef, useEffect } from "react";
import { Col, Form } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection } from "./styles";

import { PhoneOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Link,
  Button,
  CircularProgress,
  styled,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";

import { SendOtp, ValidateOtp } from "../../api/login";
import { ListStudents } from "../../api/students";
import SuccessPopup from "../../common/SuccessPopup";

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

const FormBlock = ({ icon, id, direction }: ContentBlockProps) => {
  const [loading, setLoading] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otpResendable, setOtpResendable] = useState<boolean>(false);
  const [timer, setTimer] = useState(3); // Timer countdown
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [otpValue, setOtpValue] = useState<string | undefined>(undefined);
  const [_userId, setUserId] = useState();

  const navigate = useNavigate();
  // const ctx = useContext(ApiContext);
  const [form] = Form.useForm();

  const snackbarRef = useRef<SnackbarHandle>(null);
  const OTP_TIMEOUT = 30; // 30 seconds timer

  // Close popup handler
  const handleClosePopup = () => {
    setIsPopupOpen(false);

    //New User. Need to add students
    navigate(`/studentregistration?userId=${_userId}`);
  };

  const startTimer = () => {
    setOtpResendable(false);
    setTimer(OTP_TIMEOUT);
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    } else if (timer === 0) {
      setOtpResendable(true);
    }
  }, [timer]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      //1. Get Phone number and send OTP
      if (values?.mobilenumber && !isOtpSent) {
        const phoneNumber = "+91" + values.mobilenumber;
        setUserPhone(phoneNumber);
        const response = await SendOtp(phoneNumber);
        console.log(response);
        if (response) {
          snackbarRef.current?.showSnackbar(
            `OTP sent to ${phoneNumber}.`,
            "success"
          );
          setIsOtpSent(true);
          startTimer();
        }
      }

      if (values?.otp && isOtpSent) {
        console.log("Success:", values);
        console.log(values.otp);
        const response = await ValidateOtp(userPhone, values.otp);
        console.log(response);
        if (response?.message === "User logged in") {
          setUserId(response?.userId);
          console.log("User already registered.", response?.userId);
          const studentList = await ListStudents(response?.userId);
          console.log("Student List");
          console.log(studentList);
          if (
            studentList &&
            studentList?.result &&
            studentList?.result?.length === 0
          )
            navigate(`/studentregistration?userId=${response?.userId}`);
          else if (
            studentList &&
            studentList?.result &&
            studentList?.result?.length > 0
          )
            // navigate(`/studentdashboard?userId=${response?.userId}`);
            console.log("Student already present");
        } else if (response?.message === "User registered") {
          console.log("New user registered", response?.userId);
          setUserId(response?.userId);
          setIsPopupOpen(true);
        }
      }
    } catch (error) {
      console.log(error);
      snackbarRef.current?.showSnackbar(`Please Re-Generate OTP`, "error");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  const reGenerateOTP = async () => {
    // setOtpValue(undefined);
    console.log(`Regenerate OTP for ${userPhone}`);
    const response = await SendOtp(userPhone);
    console.log(response);
    if (response) {
      snackbarRef.current?.showSnackbar(`OTP sent to ${userPhone}.`, "success");
      setIsOtpSent(true);
      startTimer();
    }
  };
  return (
    <ContentSection>
      <ToastSnackbar ref={snackbarRef} />
      <Fade direction={direction} triggerOnce>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mt={-2}
        >
          {/* <ToastContainer /> */}
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <h6 style={{ marginBottom: "15px" }}>Hey, There!</h6>
            {!isOtpSent && (
              <Form
                form={form}
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="mobilenumber"
                  rules={[
                    { required: true, message: "Enter Mobile Number" },
                    {
                      pattern: /^\d{10}$/,
                      message: "Invalid, must be 10 digits",
                    },
                  ]}
                  style={{ marginTop: "2rem" }}
                >
                  <Box display={"flex"} flexDirection={"column"}>
                    <Input
                      size="large"
                      placeholder="Enter 10 digit mobile number"
                      prefix={<PhoneOutlined />}
                      style={{ width: "70%" }}
                    />
                    <Typography variant="caption" color="textSecondary">
                      By using Asaan you agree our{" "}
                      <Link href="/privacypolicy.html" color="inherit">
                        Privacy Policy
                      </Link>
                      {" | "}
                      <Link href="/termsconditions.html" color="inherit">
                        Terms and Conditions
                      </Link>
                    </Typography>
                  </Box>
                </Form.Item>
                <Form.Item>
                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null} // Show loader in button
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </MyCustomButton>
                </Form.Item>
              </Form>
            )}
            {isOtpSent && (
              <Fade direction={"right"} triggerOnce>
                <Form
                  form={form}
                  name="login_form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    width={"80%"}
                  >
                    <Form.Item
                      name="otp"
                      rules={[{ required: true, message: "Enter OTP" }]}
                      style={{ marginTop: "2rem" }}
                    >
                      <Input.OTP
                        size="large"
                        style={{ width: "100%" }}
                        value={otpValue}
                      />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                      <Box
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                      >
                        <MyCustomButton
                          variant="contained"
                          color="primary"
                          disabled={!otpResendable}
                          onClick={reGenerateOTP}
                        >
                          Re-Generate OTP
                        </MyCustomButton>
                        {!otpResendable && (
                          <Box alignContent={"center"}>
                            <Typography variant="body2" alignItems={"start"}>
                              {timer > 0 ? `Resend OTP in ${timer} sec` : ""}
                            </Typography>
                          </Box>
                        )}
                        <MyCustomButton
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={loading}
                          startIcon={
                            loading ? <CircularProgress size={20} /> : null
                          }
                        >
                          {loading ? "WAIT..." : "Verify"}
                        </MyCustomButton>
                      </Box>
                    </Form.Item>
                  </Box>
                </Form>
              </Fade>
            )}
          </Col>
        </Box>
      </Fade>
      <SuccessPopup
        open={isPopupOpen}
        onClose={handleClosePopup}
        title="User Registered Successfully"
        message="Please provide more details to serve you better."
        buttonText="Continue"
      />
    </ContentSection>
  );
};

export default FormBlock;
