import React, { useEffect, useState } from 'react'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import './Perfil.css'
import UsuarioService from "../../services/UsuarioService"
import EventoServices from "../../services/EventoService"

import Ft3 from '../../assets/img/PrincipalImg/ft3.jpeg';
import eventoImg from '../../assets/img/imagem2.jpg';
import Usuario from '../Usuarios/Usuario'

const PerfilOng = () => {

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
        EventoServices.findAll().then(
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
                        <div className="container-perfil">
                        <div className="profile">
                            <div className="profile-header"></div>
                            <div className="profile-info">
                                <img src={Ft3} alt="Profile Picture" className="profile-picture"/>
                                <div className="profile-txt">
                                <h2>{usuario.nome}</h2>
                                <p>{usuario.email}</p>
                                <p>{usuario.telefone}</p>
                                </div>
                            </div>
                            <div className="tabs">
                                <div className="tab">Biografia</div>
                            </div>
                            <h3 className='profile-title'>Ultimos Eventos</h3>
                            <div className="events">
                            {eventos?.map((evento) => (
                                        <div className="card">
                                            <div className="top-header">
                                                <img className="img_perfil" src={Ft3}/>
                                                <span className="author">{evento.ong.nome}</span>
                                            </div>
                                                
                                            <div className="card-content">
                                                
                                                <p className="description">{evento.infos}</p>
                                            </div>
                                                
                                        </div>
                                    ))}         
                            </div>
                            </div>

                        </div> 
                     </Content>
                </Layout>
            </Layout> 
        </>
    )
}

export default PerfilOng
