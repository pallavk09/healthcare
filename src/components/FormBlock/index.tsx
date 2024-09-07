import { useContext } from "react";
import { Col, Form } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection, StyledRow } from "./styles";
import { Button } from "../../common/Button";

import { PhoneOutlined } from "@ant-design/icons";
import { Input } from "antd";
import ApiContext from "../../store/context";
import { useNavigate } from "react-router-dom";

const FormBlock = ({ icon, id, direction }: ContentBlockProps) => {
  const navigate = useNavigate();
  const ctx = useContext(ApiContext);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    //1. Get Phone number and send OTP
    if (values?.mobilenumber) {
      console.log("Success:", values);
      console.log(values.mobilenumber);
      ctx?.dispatch({ type: "IS_OPT_SEND" });
    }

    if (values?.otp) {
      console.log("Success:", values);
      console.log(values.otp);
      // ctx?.dispatch({ type: "IS_USER_VERIFIED", payload: { phoneNumber: "" } });
      navigate("/studentregistration");
    }

    //2. Validate OTP

    //3. Add user to DB

    //4. Redirect to registration page
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };
  return (
    <ContentSection>
      <Fade direction={direction} triggerOnce>
        <StyledRow
          justify="space-between"
          align="middle"
          id={id}
          direction={direction}
        >
          <Col lg={11} md={11} sm={12} xs={24}>
            <SvgIcon src={icon} width="100%" height="100%" />
          </Col>
          <Col lg={11} md={11} sm={12} xs={24}>
            <h6 style={{ marginBottom: "15px" }}>Hey, There!</h6>
            {!ctx?.state.isOtpSend && (
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
                  <Input
                    size="large"
                    placeholder="Enter 10 digit mobile number"
                    prefix={<PhoneOutlined />}
                    style={{ width: "80%" }}
                  />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button>Send OTP</Button>
                </Form.Item>
              </Form>
            )}
            {ctx?.state.isOtpSend && (
              <Fade direction={"right"} triggerOnce>
                <Form
                  form={form}
                  name="login_form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name="otp"
                    rules={[{ required: true, message: "Enter OTP" }]}
                    style={{ marginTop: "2rem" }}
                  >
                    <Input.OTP size="large" style={{ width: "80%" }} />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button>Verify</Button>
                  </Form.Item>
                </Form>
              </Fade>
            )}
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default FormBlock;
