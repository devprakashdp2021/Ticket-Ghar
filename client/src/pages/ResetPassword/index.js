import React from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { ResetPasswordUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const { id, token } = useParams();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await ResetPasswordUser(values, id, token);
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
        <h1 className="text-xl mb-1 pl-1">TICKETGHAR: Reset Password</h1>
        <hr />
        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <input type="password" />
          </Form.Item>
          <div className="flex flex-col mt-2 ml-1 mr-1 gap-1">
            <Button fullwidth title="UPDATE" type="submit" />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ResetPassword;
