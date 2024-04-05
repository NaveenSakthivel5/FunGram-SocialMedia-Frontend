import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  PlusOutlined,
  UsergroupDeleteOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './defaultlayout.css'

const { Header, Sider, Content } = Layout;
const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Layout className='site-layout'>
        <Header className='site-layout-background bs1'
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            width: '100%',
            left: 0,
            zIndex: 9999
          }}
        >
          <div className='d-flex justify-content-between align-items-center bs1'>
            <div className='d-flex align-items-center'>
              <UserOutlined />
              <h4 className='pt-2'>-     {JSON.parse(localStorage.getItem('user')).username}</h4>
            </div>
            <h2 className='logotext pt-1'>Fun Gram</h2>
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </div>
        </Header>
        <Content style={{}}>
          {children}
        </Content>
      </Layout>

      <Sider
        style={{
          position: 'sticky',
          top: 0,
          bottom: 0,
          overflow: 'auto',
          height: '100vh'
        }}
        trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">
              <HomeOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/addpost">
            <Link to="/addpost">
              <PlusOutlined />
              <span>AddPost</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/profile">
            <Link to={`/profile/${user._id}`}>
              <UserOutlined />
              <span>Profile</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="/allusers">
            <Link to="/allusers">
              <UsergroupDeleteOutlined />
              <span>All Users</span>
            </Link>
          </Menu.Item>

          <Menu.Item >
            <LogoutOutlined />
            <span>
              <Link onClick={() => { localStorage.removeItem(('user'), window.location.reload()); }}>Logout</Link>
            </span>
          </Menu.Item>

        </Menu>

      </Sider>
    </Layout>
  );
};
export default DefaultLayout;
