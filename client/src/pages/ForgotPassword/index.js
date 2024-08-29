import React from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { ForgotPasswordUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function ForgotPassword() {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await ForgotPasswordUser(values);
      if (response.success) {
        message.success(response.message);
        window.location.href = "/login";
      } else {
        dispatch(HideLoading());
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  
  return (
    <div className="flex justify-center h-screen items-center bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1 pl-1">TICKETGHAR: Forgot Password</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email" }]}
          >
            <input type="email" />
          </Form.Item>
          <div className="flex flex-col mt-2 ml-1 mr-1 gap-1">
            <Button fullwidth title="SEND" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
