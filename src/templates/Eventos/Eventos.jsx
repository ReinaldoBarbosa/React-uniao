import React, { useEffect, useState } from 'react'
import EventoService from "../../services/EventoService"
import { Avatar, Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'


import eventoImg from '../../assets/img/imagem2.jpg';

import './Evento.css'
import UsuarioService from '../../services/UsuarioService'

function Eventos() {

    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

    const [eventos, setEventos] = useState([]);
    const [usuario, setUsuario] = useState({}); 

    useEffect(() => {
        EventoService.findAll().then(
            (response) => {
                const eventos = response.data;
                setEventos(eventos);
                console.log(eventos);
            }
        ).catch((error) => {
            console.log(error);

        
        })
    }, []);

    const editar = (id) => {
        navigate(`/detalisEvento/` + id)
    }

    const [collapsed, setCollapsed] = useState(false); 

    const user = UsuarioService.getCurrentUser();
    const userID = user.id;
    const nivel = user.nivelAcesso;

    const EventosOng = () =>{
        return(
            <>
                <div className="container-evento">                                   
                    <section className="cards-events">                                                                         
                        <div className="container">
                            {eventos?.length > 0 ? (
                                eventos.map((evento) => (
                                    evento.ong.id === userID && ( 
                                    <a key={evento.id} onClick={() => editar(evento.id)}>
                                        <div className="card">
                                        <div className="top-header">
                                            <img className="img_perfil" src={evento.ong.fotoPerfil ? 'data:image/jpeg;base64,' + evento.ong.fotoPerfil : <Avatar/> } alt="..." />                            

                                            
                                            <span className="author">{evento.nome}</span>
                                            <p >{evento.ong.nome}</p>
                                        </div>
                                        <div className="card-content">
                                            <img src={evento.foto ? 'data:image/jpeg;base64,' + evento.foto : logo} className="img-evento" alt="..." />
                                            <p className="description">{evento.infos}</p>
                                        </div>
                                        </div>
                                    </a>
                                    )
                                ))
                                ) : (
                                    <p>Nenhum evento disponível</p>
                                )}
                        </div>                              
                    </section>
                </div>
            </>
        )
    }

    const EventosAdm = () =>{
        return(
            <>
                <div className="container-evento">                                   
                    <section className="cards-events">                                                                         
                        <div className="container">
                            {eventos?.map((evento) => (
                                <a  onClick={() => editar(evento.id)}>
                                    <div className="card">
                                        <div className="top-header">
                                        <img className="img_perfil" src={evento.ong?.fotoPerfil ? 'data:image/jpeg;base64,' + evento.ong.fotoPerfil : <Avatar/> } alt="..." />                            
                                        <span className="author">{evento.ong.nome}</span>
                                        </div>
                                                        
                                        <div className="card-content">
                                        <img className="shadow-lg" src={evento.fotoEvento ? 'data:image/jpeg;base64,' + evento.fotoEvento : "Não foi"} alt="..." />
                                        <p className="description">{evento.infos}</p>
                                        </div>
                                                        
                                    </div>
                                </a>
                            ))}                                          
                        </div>                              
                    </section>
                </div>
            </>
        )
    }



    return (
        <>
            <Layout classNane="body">
                <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
                <SideBar/>

                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
                </Sider>
                <Layout>
                    <Header className='header'>
                        <CustomHeader/>
                    </Header>
                    <Content className='content'>
                        <div className="header_user">   
                            <Link to={'/novoEvento'}>
                                <button className='new-user-btn' type='submit'>
                                    Novo Evento
                                </button>
                            </Link>                    
                        </div>
                
                        {(nivel == "ADM") ? <EventosAdm/> : <EventosOng/>}
                    </Content>
                </Layout>
            </Layout>
        </>
  )
}

export default Eventos
