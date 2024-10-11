import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import UsuarioService from "../../services/UsuarioService"
import './Usuario.css'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined, EditOutlined} from '@ant-design/icons'
import Widget from '../../components/Widget/Widget'



const Usuario = () => {


    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        UsuarioService.findAll().then(
            (response) => {
                const usuarios = response.data;
                setUsuarios(usuarios);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)
    }
    const detalis = (id) => {
        navigate(`/perfil1/` + id)
    }

    const [collapsed, setCollapsed] = useState(false); 

    return (

    <Layout classNane="body">
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
        <SideBar/>

        <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />        </Sider>
        <Layout>
            <Header className='header'>
                <CustomHeader/>
            </Header>
            <Content className='content'>

                <div className="header_user">
                    <Typography.Title>
                        Monitore os usuarios da sua <span className='txt-green'>plataforma</span>
                    </Typography.Title>

                    <div className="widgets">
                        <Widget type="TotalUser"/>
                        <Widget type="AbandonoUser"/>
                    </div>
                </div>
           
                <div className="d-flex">
                    
                    <div className="p-3 w-100">
                
                        <section className="m-2 p-2 shadow-lg">
                            <div className="table-container ">
                                <div className="top_table">

                                    <Typography.Title className='title-user'>
                                        Usuarios
                                    </Typography.Title>
                                
                                <Link to={'/novoUser'}>
                                    <button className='new-user-btn' type='submit'>
                                        Novo usaurios
                                    </button>
                                </Link>

                                </div>
                                <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Data</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Nivel de Acesso</th>
                                            <th scope="col">Status</th>                           
                                            <th scope="col">Mais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios?.map((usuario) => (
                                            <tr className="" key={usuario.id}>
                                               
                                                <td className="user_detalis" onClick={() => detalis(usuario.id)} >{usuario.nome}</td>
                                                <td>{usuario.dataCadastro}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.nivelAcesso}</td>                               
                                                <td>{usuario.statusUsuario}</td>
                                                
                                                <td>
                                                    <button onClick={() => editar(usuario.id)}>
                                                    <EditOutlined />
                                                    </button>
                                                </td>                            
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </Content>
        </Layout>
  </Layout>
    )
}

export default Usuario
