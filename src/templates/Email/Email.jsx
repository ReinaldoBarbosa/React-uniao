import React, { useEffect, useState } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import './Email.css'
import MensagemService from '../../services/MensagemService'

import Ft2 from '../../assets/img/PrincipalImg/ft1.jpeg';

const Email = () => {

    const [mensagens, setMensagens] = useState([]);

    useEffect(() => {
        MensagemService.findAll().then(
            (response) => {
                const mensagens = response.data;
                setMensagens(mensagens);
            }
        ).catch((error) => {
            console.log(error);

        
        })
    }, []);

    console.log(mensagens)

    const [collapsed, setCollapsed] = useState(false); 


    return (
        <>
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
                        <div class="email-list-container">

                            <Typography.Title>
                                Mensagens
                            </Typography.Title>

                            {mensagens?.map((mensagem) => (
                                <div class="email-item">
                                    <img src={Ft2} alt="Logo 1"/>
                                    <div class="email-text">
                                        <div class="email-title">{mensagem.emissorMensagem}</div>
                                        <div class="email-description">{mensagem.texto}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default Email
