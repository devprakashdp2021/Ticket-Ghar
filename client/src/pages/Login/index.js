import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser, LoginUserUsingGoogle } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GoogleLogin } from "@react-oauth/google";

function LOGIN() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        dispatch(HideLoading());
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Google login success handler
  const handleGoogleSuccess = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUserUsingGoogle(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error("Google login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1 pl-1">TICKETGHAR - LOGIN</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 ml-1 mr-1 gap-1">
            <Button fullwidth title="LOGIN" type="submit" />

            <GoogleLogin fullwidth
              onSuccess={handleGoogleSuccess}
              onError={() => message.error("Google login failed")}
            />

            <Link to="/register" className="text-primary">
              Don't have an account? Register
            </Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LOGIN;
