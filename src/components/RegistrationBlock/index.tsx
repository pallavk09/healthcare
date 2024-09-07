import { useState, useEffect } from "react";
import {
  Col,
  Divider,
  Steps,
  Form,
  Input,
  FormInstance,
  Button,
  Space,
  Select,
  InputNumber,
} from "antd";
import { Fade } from "react-awesome-reveal";

import { ContentSection, StyledRow, Empty, Language, Para } from "./styles";
import { SvgIcon } from "../../common/SvgIcon";
// import { Button } from "../../common/Button";
import { PhoneOutlined } from "@ant-design/icons";

const RegistrationBlock = () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <ContentSection>
      <Fade direction={"right"} triggerOnce>
        <StyledRow
          justify="space-between"
          align="stretch"
          id={"id"}
          direction={"left"}
        >
          <Col lg={8} md={8} sm={12} xs={24}>
            <Steps
              current={current}
              onChange={onChange}
              direction="vertical"
              style={{ marginTop: "1rem", height: "300px" }}
              items={[
                {
                  title: "Academic Details",
                  //   description:
                  //     "Educational background and current academic preferences",
                },
                {
                  title: "Personal Details",
                  //   description: "Personal details of the student",
                },
                {
                  title: "Setup Payment",
                  //   description: "Configure preferred payment method",
                },
                {
                  title: "Review and Submit",
                  //   description: "Configure preferred payment method",
                },
              ]}
            />
          </Col>
          <Col
            lg={11}
            md={11}
            sm={12}
            xs={24}
            style={{ marginRight: "1.5rem" }}
          >
            <Form
              form={form}
              name="login_form"
              layout="vertical"
              initialValues={{ remember: true }}
            >
              {/* Row 1: Student name */}
              <Form.Item
                label="Student Name"
                name="studentname"
                rules={[{ required: true, message: "Required" }]}
              >
                <Form.Item
                  name="firstname"
                  style={{
                    display: "inline-block",
                    width: "calc(35% - 8px)",
                    marginRight: "3px",
                  }}
                >
                  <Input placeholder="First Name" />
                </Form.Item>

                <Form.Item
                  name="middlename"
                  rules={[{ required: false }]}
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 8px)",
                    marginLeft: "3px",
                    marginRight: "3px",
                  }}
                >
                  <Input placeholder="Middle Name" />
                </Form.Item>

                <Form.Item
                  name="lastname"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(35% - 8px)",
                    marginLeft: "3px",
                  }}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Form.Item>

              {/* Row 1: Roll number, Class and House Name */}
              <Form.Item>
                <Form.Item
                  name="rollnumber"
                  label="Roll Number"
                  rules={[{ required: true, message: "Required" }]}
                  style={{
                    display: "inline-block",
                    width: "calc(20% - 8px)",
                    marginRight: "-6px",
                  }}
                >
                  <InputNumber placeholder="Roll No" />
                </Form.Item>
                <Form.Item
                  label="Which class do you study ?"
                  rules={[{ required: true, message: "Required" }]}
                  name="class"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginRight: "3px",
                  }}
                >
                  <Select placeholder="Select class">
                    <Select.Option value="lkg">LKG</Select.Option>
                    <Select.Option value="ukg">UKG</Select.Option>
                    <Select.Option value="class1">CLASS I</Select.Option>
                    <Select.Option value="class2">CLASS II</Select.Option>
                    <Select.Option value="class4">CLASS III</Select.Option>
                    <Select.Option value="class4">CLASS IV</Select.Option>
                    <Select.Option value="class5">CLASS V</Select.Option>
                    <Select.Option value="class6">CLASS VI</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="housename"
                  label="House Name"
                  rules={[{ required: true, message: "Required" }]}
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 8px)",
                    marginLeft: "3px",
                  }}
                >
                  <Input placeholder="House Name" />
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </StyledRow>
      </Fade>
    </ContentSection>
  );
};

export default RegistrationBlock;
