import { Breadcrumb, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom';

const ContentLayoutDashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return (
    <>
    <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Content
            
          >
            <Outlet/>
          </Content>
        </Layout>
    </>
  )
}

export default ContentLayoutDashboard
