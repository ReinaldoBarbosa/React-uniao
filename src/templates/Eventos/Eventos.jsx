import React, { useEffect, useState } from 'react'
import EventoService from "../../services/EventoService"
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import Ft3 from '../../assets/img/PrincipalImg/ft3.jpeg';
import eventoImg from '../../assets/img/imagem2.jpg';

import './Evento.css'

function Eventos() {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        EventoService.findAll().then(
            (response) => {
                const eventos = response.data;
                setEventos(eventos);
            }
        ).catch((error) => {
            console.log(error);

        
        })
    }, []);

    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)
    }

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
                        <div className="header_user">                          
                            <button className='new-user-btn' type='submit'>
                                Novo usaurios
                            </button>
                        </div>
                
                        <div className="container-evento">                                   
                            <section className="cards-events">                                                                         
                                <div className="container">
                                    {eventos?.map((evento) => (
                                        <div className="card">
                                            <div className="top-header">
                                                <img className="img_perfil" src={Ft3}/>
                                                <span className="author">{evento.ong.nome}</span>
                                            </div>
                                                
                                            <div className="card-content">
                                                <img src={eventoImg} className='img-evento' />
                                                <p className="description">{evento.infos}</p>
                                            </div>
                                                
                                        </div>
                                    ))}                                          
                                </div>                              
                            </section>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
  )
}

export default Eventos
