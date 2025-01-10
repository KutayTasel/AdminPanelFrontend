import React, { useState } from "react";
import { Form, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/common/InputField";
import "../assets/css/Register.scss";
import Lottie from "react-lottie";
import animationData from "../assets/animation/animation.json";
import AuthValidations from "../validations/Validation";
import AuthService from "../services/AuthService";
import Spinner from "../components/common/Spinner";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await AuthService.RegisterServiceAsync({
        userName: values.username.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        confirmPassword: values.confirmPassword.trim(),
      });

      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors
          .map((err) => err.errorMessage)
          .join(" ");
        setErrorMessage(errorMessages);
      } else if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        setErrorMessage("No response from server.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
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
    <div className="register-container">
      {loading && <Spinner />}
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="moving-stars"></div>
      <div className="shooting-stars"></div>
      <div className="register-content">
        <div className="lottie-container">
          <Lottie options={defaultOptions} height={350} width={350} />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegister}
          className="register-form"
        >
          <InputField
            name="username"
            placeholder="Username"
            type="text"
            rules={[
              {
                validator: (_, value) => {
                  const errors = AuthValidations.validateUsername(value);
                  if (errors.length) {
                    return Promise.reject(errors[0]);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
          <InputField
            name="email"
            placeholder="Email"
            type="email"
            rules={[
              {
                validator: (_, value) => {
                  const errors = AuthValidations.validateEmail(value);
                  if (errors.length) {
                    return Promise.reject(errors[0]);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            rules={[
              {
                validator: (_, value) => {
                  const errors = AuthValidations.validatePassword(value);
                  if (errors.length) {
                    return Promise.reject(errors[0]);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
          <InputField
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            dependencies={["password"]}
            rules={[
              {
                validator: (_, value) => {
                  const password = form.getFieldValue("password");
                  const errors = AuthValidations.validateConfirmPassword(
                    password,
                    value
                  );
                  if (errors.length) {
                    return Promise.reject(errors[0]);
                  }
                  return Promise.resolve();
                },
              },
            ]}
          />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="register-button"
              size="large"
            >
              Register
            </Button>
          </Form.Item>
          <div className="register-links">
            <Link to="/login" className="register-link">
              Already have an account? Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
