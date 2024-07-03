import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select } from "antd";
import imageLogo from "../images/logo.png";
import Background from "../components/Background";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Login = ({ openNotification }) => {
  const loginMutation = useMutation((formData) =>
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Đăng nhập thất bại!");
      }
      return res.json();
    })
  );
  const navigate = useNavigate();
  const options = [
    {
      value: "local",
      label: "local",
    },
    {
      value: "domain",
      label: "domain",
    },
  ];
  console.log("qágfdsa",loginMutation)
  const [isHidenElement, setIsHidenElement] = useState("");
  const [formLayout, setFormLayout] = useState("vertical");
  const onFinish = async (values) => {
    try {
      const data = await loginMutation.mutateAsync(values);
      console.log("valueeee:", data);
      console.log("loginMutation: ", loginMutation);

      if (data.statusCode === 1) {
        console.log("ghjkljh: ", data.statusCode);
        console.log("Đăng nhập thành công!");
        localStorage.setItem("accessToken", data.data.access_token);
        openNotification("Đăng nhập thành công", "success");
        navigate("/");
      } else {
        console.log(
          "Đăng nhập không thành công. Mã lỗi:",
          data ? data.statusCode : "Không có dữ liệu trả về"
        );
        if (data?.message == "User is not exist.") {
          openNotification("Người dùng không tồn tại.", "error");
        } else if (data?.message == "Your password is not correct.") {
          openNotification("Mật khẩu của bạn không đúng.", "error");
        }
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      openNotification("Đăng nhập thất bại", "error");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleAuthenticationChange = (value) => {
    setIsHidenElement(value);
  };

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;
  return (
    <>
      <div>
        <Background />
        <div className="max-w-full h-screen flex items-center justify-center flex-col">
          <div className="flex flex-col items-center">
            <div className="logo">
              <img src={imageLogo} alt="imageLogo" className="h-20" />
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-6">
              <h1 className="text-3xl font-bold">eConstruction</h1>
              <span className="text-base">Đăng nhập để tiếp tục</span>
            </div>
          </div>
          <div className="bg-white w-96 h-auto flex flex-col p-8 justify-center border-2">
            <Form
              initialValues={{
                checkbox: true,
                username: "ADMIN@GMAIL.COM",
                password: "admin",
              }}
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              layout={formLayout}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Phương thức xác thực"
                name="phuongthucxacthuc"
                className="text-sm font-medium"
              >
                <Select
                  size="large"
                  defaultValue="local"
                  onChange={handleAuthenticationChange}
                  className="w-10"
                  options={options}
                />
              </Form.Item>
              {isHidenElement === "domain" ? null : (
                <>
                  <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                    className="text-sm font-medium"
                  >
                    <Input className="h-10 " />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    className="text-sm font-medium"
                  >
                    <Input.Password className="h-10 " />
                  </Form.Item>

                  <Form.Item
                    name="checkbox"
                    valuePropName="checked"
                    {...buttonItemLayout}
                    className="text-sm font-medium"
                  >
                    <Checkbox>Ghi nhớ</Checkbox>
                  </Form.Item>
                </>
              )}
              <Form.Item {...buttonItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full h-10 text-sm font-medium bg-[#16315e]"
                >
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
