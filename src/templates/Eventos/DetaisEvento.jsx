import React, { useEffect, useState } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import { MenuUnfoldOutlined, MenuFoldOutlined, EditOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'

import './DetalisEvento.css'
import EventoService from "../../services/EventoService"

import Ft3 from '../../assets/img/PrincipalImg/ft3.jpeg';
import eventoImg from '../../assets/img/imagem2.jpg';

const DetalisEvento = () => {

    const navigate = useNavigate();

    const objectValues = {
        nome: "",
        email: "",
        nivelAcesso: "",
        ong: "",
    };
    
    const [evento, setEvento] = useState(objectValues); 

    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }));
    }


    useEffect(() => {
        EventoService.findById(id).then(
            (response) => {
                const evento = response.data;
                setEvento(evento);
                console.log(evento);
            }
        ).catch((error) => {
            console.log(error);
        })

    }, []);

    const editar = (id) => {
        navigate(`/editarEvento/${id}`)
    }


    const [collapsed, setCollapsed] = useState(false); 
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
                        <div className="container-perfil">
                        <div class="profile">
                            <div class="profile-header">
                        
                            </div>
                            <div class="profile-info">

                                <div className="profile-txt">

                                <h2>{evento.nome}</h2>
                                <p>{evento.ong.nome}</p>
                                <button onClick={() => editar(evento.id)}>
                                                                    <EditOutlined />
                                                                </button>
                                </div>
                            </div>
                            <div class="tabs">
                                <div class="tab">
                                    
                                    <h2 className='tab_title'>Informações</h2>

                                    <p>{evento.infos}</p>
                                </div>
                                
                            </div>
                            <h3 className='profile-title'>Imagens</h3>
                            <div class="events">
                            <div className="img-content">
                                    <img className="shadow-lg" src={evento.fotoEvento ? 'data:image/jpeg;base64,' + evento.fotoEvento : "Não foi"} alt="..." />
                                </div>
                                
                            </div>
                            </div>

                        </div> 
                     </Content>
                </Layout>
            </Layout> 
        </>
    )
}

export default DetalisEvento
