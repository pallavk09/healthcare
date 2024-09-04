import { Col, Form } from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentBlockProps } from "./types";
import { SvgIcon } from "../../common/SvgIcon";
import { ContentSection, StyledRow } from "./styles";
import { Button } from "../../common/Button";

import { PhoneOutlined } from "@ant-design/icons";
import { Input } from "antd";

const FormBlock = ({ icon, id, direction }: ContentBlockProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    //1. Show OTP box

    //2. Validate OTP

    //3. Add user to DB

    //4. Redirect to registration page
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
            <h6 style={{ marginBottom: "5px" }}>Hey, Let's begin</h6>
            <Form
              form={form}
              name="basic"
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
              >
                <Input
                  size="large"
                  placeholder="Enter 10 digit mobile number"
                  prefix={<PhoneOutlined />}
                  style={{ width: "80%" }}
                />
              </Form.Item>
              <Form.Item>
                <Button>Send OTP</Button>
              </Form.Item>
            </Form>
            {/* <LoginForm /> */}
            {/* <FormGroup autoComplete="off" onSubmit={handleSubmit}>
              <Input
                size="large"
                placeholder="+91-1234567898 "
                prefix={<PhoneOutlined />}
                style={{ width: "80%" }}
              />
              <Button>Send OTP</Button>
            </FormGroup> */}
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default FormBlock;
