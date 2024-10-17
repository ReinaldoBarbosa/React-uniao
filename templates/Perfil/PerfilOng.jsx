import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import SideBar from '../../components/SideBar/SideBar';
import CustomHeader from '../../components/Header/Header';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import './Perfil.css';
import UsuarioService from "../../services/UsuarioService";
import EventoServices from "../../services/EventoService";

const PerfilOng = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Pegando o ID do usuário

    const objectValues = {
        nome: "",
        email: "",
        nivelAcesso: ""
    };

    const [usuario, setUsuario] = useState(objectValues); 
    const [eventos, setEventos] = useState([]);
    const [collapsed, setCollapsed] = useState(false); 

    // Carrega as informações do usuário
    useEffect(() => {
        UsuarioService.findById(id).then((response) => {
            setUsuario(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    // Carrega os eventos relacionados à ONG
    useEffect(() => {
        EventoServices.findAll().then((response) => {
            setEventos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    // Filtra os eventos da ONG atual
    const eventosFiltrados = eventos.filter(evento => evento.ong.id === usuario.id);

    const verEvento = (id) => {
        navigate(`/detalisEvento/${id}`);
    };

    return (
        <Layout className="body">
            <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">
                <SideBar />
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
            </Sider>
            <Layout>
                <Header className="header">
                    <CustomHeader />
                </Header>
                <Content className="content">
                    <div className="container-perfil">
                        <div className="profile">
                            <div className="profile-header"></div>
                            <div className="profile-info">
                                {usuario.fotoPerfil ? (
                                    <img
                                        className="profile-picture"
                                        src={`data:image/jpeg;base64,${usuario.fotoPerfil}`}
                                        alt={usuario.nome}
                                    />
                                ) : (
                                    <Avatar size={64} icon={<Avatar />} />
                                )}

                                <div className="profile-txt">
                                    <h2>{usuario.nome}</h2>
                                    <p>{usuario.email}</p>
                                    <p>{usuario.telefone}</p>
                                </div>
                            </div>
                            <div className="tabs">
                                <div className="tab">Biografia</div>
                            </div>
                            <h3 className="profile-title">Últimos Eventos</h3>
                            <div className="events">
                                {eventosFiltrados.length > 0 ? (
                                    eventosFiltrados.map((evento) => (
                                        <a  onClick={() => verEvento(evento.id)}>
                                            <div className="card" key={evento.id}>
                                                <div className="top-header">
                                                    {evento.ong.fotoPerfil ? (
                                                        <img
                                                            className="img_perfil"
                                                            src={`data:image/jpeg;base64,${evento.ong.fotoPerfil}`}
                                                            alt={evento.ong.nome}
                                                        />
                                                    ) : (
                                                        <Avatar size={64} icon={<Avatar />} />
                                                    )}
                                                    <span className="author">{evento.ong.nome}</span>
                                                </div>
                                                <div className="card-content">
                                                    <img
                                                        className="shadow-lg"
                                                        src={evento.fotoEvento ? `data:image/jpeg;base64,${evento.fotoEvento}` : 'defaultImage.jpg'}
                                                        alt={evento.nome}
                                                    />
                                                    <p className="description">{evento.infos}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))
                                ) : (
                                    <p>Nenhum evento encontrado para esta ONG.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default PerfilOng;
