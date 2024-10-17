import React, { useEffect, useState } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'

import './Perfil.css'
import EventoService from "../../services/EventoService"

import Ft3 from '../../assets/img/PrincipalImg/ft3.jpeg';
import eventoImg from '../../assets/img/imagem2.jpg';
import UsuarioService from '../../services/UsuarioService'

const PerfilVoluntario = () => {

    const navigate = useNavigate();

    const objectValues = {
        nome: "",
        email: "",
        nivelAcesso: ""
    };
    
    const [usuario, setUsuario] = useState(objectValues); 

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
        UsuarioService.findById(id).then(
            (response) => {
                const usuario = response.data;
                setUsuario(usuario);
                console.log(usuario);
            }
        ).catch((error) => {
            console.log(error);
        })

    }, []);
  
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
    

    const goToAlterarSenha = () => {
        navigate(`/usuarioalterarsenha/` + id);
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
                        <div className="container-perfil">
                        <div class="profile">
                            <div class="profile-header"></div>
                            <div class="profile-info">
                                <img src={Ft3} alt="Profile Picture" class="profile-picture"/>
                                <div className="profile-txt">
                                <h2>{usuario.nome}</h2>
                                <p>{usuario.email}</p>
                                <p>{usuario.telefone}</p>   
                                </div>
                            </div>
                            <div class="tabs">
                                <div class="tab">Biografia</div>

                                <div class="tab">Habilidades</div>
                            </div>
                            <h3 className='profile-title'>Eventos Realizados</h3>
                            <div class="events">
                                <div class="event-card">
                                <img src="event-image.jpg" alt="Event"/>
                                <div class="event-details">
                                    <h4>Marcos Aurelio</h4>
                                    <p>Sarinas, SP</p>
                                    <p>Descrição do evento...</p>
                                </div>
                                </div>
                                <div class="event-card">
                                <img src="event-image.jpg" alt="Event"/>
                                <div class="event-details">
                                    <h4>Marcos Aurelio</h4>
                                    <p>Sarinas, SP</p>
                                    <p>Descrição do evento...</p>
                                </div>
                                </div>
                                <div class="event-card">
                                <img src="event-image.jpg" alt="Event"/>
                                <div class="event-details">
                                    <h4>Marcos Aurelio</h4>
                                    <p>Sarinas, SP</p>
                                    <p>Descrição do evento...</p>
                                </div>
                                </div>
                                <div class="event-card">
                                <img src="event-image.jpg" alt="Event"/>
                                <div class="event-details">
                                    <h4>Marcos Aurelio</h4>
                                    <p>Sarinas, SP</p>
                                    <p>Descrição do evento...</p>
                                </div>
                                </div>
                                <div class="event-card">
                                <img src="event-image.jpg" alt="Event"/>
                                <div class="event-details">
                                    <h4>Marcos Aurelio</h4>
                                    <p>Sarinas, SP</p>
                                    <p>Descrição do evento...</p>
                                </div>
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

export default PerfilVoluntario
