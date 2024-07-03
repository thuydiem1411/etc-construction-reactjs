import React, { useState } from 'react';
import HeaderLayoutDasboard from '../components/HeaderLayoutDasboard';
import NavbarLayoutDashboard from '../components/NavbarLayoutDashboard';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const LayoutDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <HeaderLayoutDasboard collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <NavbarLayoutDashboard collapsed={collapsed} />
    </>
  );
};

export default LayoutDashboard;
