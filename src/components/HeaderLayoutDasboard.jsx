import { Layout, Button, Dropdown, Space, Avatar } from "antd";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { IoLanguageOutline } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import imageLogo from "../images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const { Header } = Layout;
const HeaderLayoutDasboard = ({ collapsed, toggleCollapsed }) => {
  const items = [
    {
      key: "1",
      label: (
        
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Thông tin cá nhân
        </a>
      ),
    },
    {
      key: "2",
      danger: true,
      label: <Link to="/login">Đăng xuất</Link>,
    },
  ];

  const items1 = [
    {
      label: <a href="https://www.antgroup.com">VI Tiếng Việt</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">EN Tiếng Anh</a>,
      key: "1",
    },
  ];

  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
        className="bg-white border-b-2 flex justify-between"
      >
        <div className="flex items-center gap-8">
          <Button onClick={toggleCollapsed} className="p-0 h-auto border-none">
            {collapsed ? <CgMenuGridO className="h-6 w-6 "/> : <CgMenuGridO className="h-6 w-6 "/>}
          </Button>
          <Link to="" ><img src={imageLogo} alt="imageLogo" className="max-h-12" /></Link>
          
        </div>
        <div className=" flex items-center gap-1 font-bold text-sm relative">
        <Button type="link" size="large" className="text-sm">
          Quy định
        </Button>
          <Avatar icon={<UserOutlined />} />
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                ADMIN@GMAIL.COM
                <DownOutlined />
              </Space>
            </a>
           
          </Dropdown>
          <p className="font-thin opacity-20 p-2">|</p>
          <Dropdown
            menu={{
              items1,
            }}
            trigger={["click"]}
          >
            <Button className="flex justify-center" shape="circle" size="default">
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <IoLanguageOutline />
                </Space>
              </a>
            </Button>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default HeaderLayoutDasboard;
