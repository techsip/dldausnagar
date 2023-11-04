import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography, message } from "antd";
import "./style.css";
import { login } from "../../services/auth";
import { setCookie } from "../../utils";
const { Paragraph } = Typography;

interface Props {
  checkAuth: any;
}
const Login = ({ checkAuth }: Props) => {
  const onFinish = async (values: any) => {
    try {
      const res = await login(values);
      if (res?.token) {
        setCookie("token", res?.token);
        setCookie("name", res?.name);
        setCookie("role", res?.role);
        checkAuth(true);
      } else {
        message.error(res?.error || "Something went wrong");
      }
      console.log("res", res);
    } catch (e) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="background">
        <div className="bg-overlay" />
      </div>
      <div className="login-container">
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item>
            <Typography>
              <Paragraph className="login-form-heading">
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                  className="form-logo"
                />
                District Level Development Authority US NAGAR
              </Paragraph>
            </Typography>
          </Form.Item>
          <div className="form-inputs">
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                type="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
