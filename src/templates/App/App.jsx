

import { Layout, Button, Flex } from 'antd'
import { useState } from 'react'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import SideBar from '../../components/SideBar/SideBar';
import CustomHeader from '../../components/Header/Header';
import { Route, Routes } from 'react-router-dom'
import Analytics from '../Analytics/Analytics'
import Email from '../Email/Email'
import ViewPage from '../ListPage/ViewPage'
import './App.css'
import MainContent from '../../components/Analytics/MainContent';
import SideContent from '../../components/Analytics/SideContent';


const {Sider, Header, Content} = Layout;


const App = () => {


  const [collapsed, setCollapsed] = useState(false); 

  return (


    <Layout className="body">
    <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
      <SideBar/>

      <Button type='text' ico={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> } onClick={() => setCollapsed(!collapsed)} className='triger-btn' />
    </Sider>
    <Layout>
      <Header className='header'>
        <CustomHeader/>
      </Header>
      <Content className='content'>
        <Flex gap="large">
          <MainContent/>
          <SideContent/>
        </Flex>
      </Content>
    </Layout>
  </Layout>




)
}

export default App
