import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import Widget from '../../components/Widget/Widget'
import PerfilRevision from '../../components/Table/Table'

const PagPerfilRevisao = () => {


    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }


    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)
    }

    const [collapsed, setCollapsed] = useState(false); 

    return (

    <Layout classNane="body">
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
        <SideBar/>

        <Button type='text' ico={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> } onClick={() => setCollapsed(!collapsed)} className='triger-btn' />
        </Sider>
        <Layout>
            <Header className='header'>
                <CustomHeader/>
            </Header>
            <Content className='content'>

                <div className="header_user">
                    <Typography.Title>
                        Monitore a saúde <br /> do seu negócio
                    </Typography.Title>
                </div>
           
                <PerfilRevision/>
            </Content>
        </Layout>
  </Layout>
    )
}

export default PagPerfilRevisao
