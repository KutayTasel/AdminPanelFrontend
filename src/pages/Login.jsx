import React, { useState, useEffect } from "react";
import { Form, Button, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/common/InputField";
import "../assets/css/Login.scss";
import Lottie from "react-lottie";
import animationData from "../assets/animation/animation.json";
import AuthService from "../services/AuthService";
import Spinner from "../components/common/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const snowflakes = document.createElement("div");
    snowflakes.classList.add("snowflakes");

    for (let i = 0; i < 50; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflakes.appendChild(snowflake);
    }

    document.body.appendChild(snowflakes);

    return () => {
      document.body.removeChild(snowflakes);
    };
  }, []);

  const handleLogin = async (values) => {
    setLoading(true);

    try {
      const { username, password } = values;

      const response = await AuthService.LoginServiceAsync({
        userName: username.trim(),
        password: password.trim(),
      });

      if (response.status === 200 && response.data.token) {
        sessionStorage.setItem("token", response.data.token);

        navigate("/home", { replace: true });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      message.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="login-container">
        <div className="login-content">
          <div className="lottie-container">
            <Lottie options={defaultOptions} height={350} width={350} />
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username." },
              ]}
            >
              <InputField name="username" placeholder="Username" type="text" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password." },
              ]}
            >
              <InputField
                name="password"
                placeholder="Password"
                type="password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-button"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
            <div className="login-links">
              <Link to="/register" className="login-link">
                Don't have an account? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
