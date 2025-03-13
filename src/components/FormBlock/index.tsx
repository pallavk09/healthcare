import { useState, useRef, useEffect, useContext } from "react";
import { Col, Form } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection } from "./styles";

import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Link,
  Button,
  CircularProgress,
  styled,
  Paper,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import ToastSnackbar, { SnackbarHandle } from "../../common/ToastNotification";
import { login } from "../../service/authService";

// import userDataContext from "../../store/UserContext";

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
  const [_userId, setUserId] = useState();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  // const ctx = useContext(userDataContext);
  const [form] = Form.useForm();

  const snackbarRef = useRef<SnackbarHandle>(null);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const userName = values.username;
      const password = values.password;

      const response = await login(userName, password);
      response.message === "User verified"
        ? navigate("/home")
        : snackbarRef.current?.showSnackbar(`${response.message}`, "warning");
    } catch (error) {
      snackbarRef.current?.showSnackbar(`Login Error`, "error");
    } finally {
      setLoading(false);
    }
    // if (user) navigate("/home");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <ContentSection>
      <ToastSnackbar ref={snackbarRef} />
      <Fade direction={direction} triggerOnce>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>

          <Col
            lg={11}
            md={11}
            sm={12}
            xs={24}
            style={{ alignSelf: "flex-end" }}
          >
            <Typography variant="h3">
              <strong>Eduern Login</strong>
            </Typography>
            <Form
              form={form}
              name="login_form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Required" }]}
                style={{ marginTop: "2rem" }}
              >
                <Input
                  size="middle"
                  placeholder="Username"
                  prefix={<UserOutlined />}
                  style={{ width: "60%" }}
                  variant="outlined"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input
                  size="middle"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                  style={{ width: "60%" }}
                  variant="outlined"
                  type={visible ? "text" : "password"}
                  suffix={
                    <span
                      onClick={() => setVisible((prev) => !prev)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && setVisible((prev) => !prev)
                      } // Keyboard accessibility
                      role="button"
                      tabIndex={0}
                      style={{
                        cursor: "pointer",
                        padding: "5px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "18px",
                        color: "#888",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1890ff")
                      } // Hover effect
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#888")
                      }
                    >
                      {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </span>
                  }
                />
              </Form.Item>
              <Form.Item>
                <Box display={"flex"} flexDirection={"column"}>
                  <MyCustomButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{
                      width: "60%",
                    }}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null} // Show loader in button
                  >
                    {loading ? "Wait..." : "LOGIN"}
                  </MyCustomButton>
                  {/* <Typography variant="caption" color="textSecondary">
                    By using Eduern you agree our{" "}
                    <Link href="/privacypolicy.html" color="inherit">
                      Privacy Policy
                    </Link>
                    {" | "}
                    <Link href="/termsconditions.html" color="inherit">
                      Terms and Conditions
                    </Link>
                  </Typography> */}
                </Box>
              </Form.Item>
            </Form>
          </Col>
        </Box>
      </Fade>
    </ContentSection>
  );
};

export default FormBlock;
