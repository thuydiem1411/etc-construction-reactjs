import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import ContentLayoutDashboard from './ContentLayoutDashboard';
import { Link } from 'react-router-dom';
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const NavbarLayoutDashboard = ({ collapsed }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    const items = [
        getItem(<Link to={""}><HomeOutlined /> Trang chủ </Link>),
        getItem('Thanh Toán', 'sub1', <ProductOutlined />, [
          getItem('Bảng thanh toán', '5'),
          getItem('Phê duyệt bảng khối lượng', '6'),
          getItem('Đệ trình thanh toán', '7'),
          getItem('Xác nhận khối lượng', '8'),
          getItem('Lập trình thanh toán', '9'),
          getItem(<Link to="/khautru">Khấu trừ</Link>, '10'),
          getItem('Danh sách thanh toán', '11'),
        ]),
        getItem('Quản lí vật tư/thiết bị', 'sub2', <ProductOutlined />, [
          getItem('Xác nhận', '12'),
          getItem('Xuất kho', '13'),
          getItem('Duyệt', '14'),
          
        ]),
        getItem('Báo cáo', 'sub3', <ProductOutlined />, [
            getItem('Báo cáo khối lượng thanh toán', '15'),
            
          ]),
          getItem('Quản lí tài khoản', 'sub4', <ProductOutlined />, [
            getItem('Danh sách tài khoản', '10'),
          ]),
      ];
  return (
    <>
      <Layout className='min-h-screen ove'>
        <Sider
          width={250}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        className='bg-[#F2F5F8]'
      />
        </Sider>
        <ContentLayoutDashboard/>
      </Layout>
    </>
  );
};

export default NavbarLayoutDashboard;
