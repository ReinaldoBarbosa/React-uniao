import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import CandidaturaService from "../../services/CandidaturaService"
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined, CheckOutlined, CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons'
import Widget from '../../components/Widget/Widget'
import './Solicitacao.css'
import UsuarioService from '../../services/UsuarioService'


const Solitacao = () => {

    const [candidaturas, setCandidaturas] = useState([]);


    useEffect(() => {
        CandidaturaService.findAll().then(
            (response) => {
                const candidaturas = response.data;
                setCandidaturas(candidaturas);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);


    const ativar = (id) => {
        CandidaturaService.ativar(id)
        alert("Solicitação acetita")
    }

    const reportar = (id) => {
        CandidaturaService.reportar(id)
        alert("Solicitação reposrtada")
    }
    const inativar = (id) => {
        CandidaturaService.reportar(id)
        alert("Solicitação recusada")
    }
    const user = UsuarioService.getCurrentUser();
    const userID = user.id;

    const [collapsed, setCollapsed] = useState(false); const [usuarios, setUsuarios] = useState([]);

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
                    <Typography.Title>
                        Solicitações mais recentes
                    </Typography.Title>

                    <div className="widgets">
                        <Widget type="Total"/>
                    </div>
                </div>
           
                <div className="d-flex">
                    
                    <div className="p-3 w-100">
                
                        <section className="m-2 p-2 shadow-lg">
                            <div className="table-container ">
                                <div className="top_table">

                                    <Typography.Title className='title-user'>
                                        Solicitações
                                    </Typography.Title>
                                
                             

                                </div>
                                
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Voluntário</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Evento</th>                        
                                            <th scope="col">Status</th>                        
                                            <th scope="col">Aceitação</th>                        
                                            <th scope="col">Mais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidaturas?.length > 0 ? (
                                            candidaturas.map((candidatura) => (
                                                (candidatura.id === userID && candidatura.statusCadastro === "ATIVO") && (
                                                <tr key={candidatura.id}>
                                                <td>{candidatura.usuario?.nome}</td>
                                                <td>{candidatura.usuario?.email}</td>
                                                <td>{candidatura.evento?.nome}</td>
                                                <td>{candidatura.statusCadastro}</td>

                                                <td className='col_td'>
                                                    <CheckOutlined className='icon_s check' onClick={() => ativar(candidatura.id)}/>
                                                    <CloseOutlined className='icon_s close' onClick={() => inativar(candidatura.id)} />
                                                </td>
                                                
                                            
                                                <td className='col_td'>
                                                    <ExclamationCircleOutlined className='icon_s report' onClick={() => reportar(candidatura.id)}/>
                                                   
                                                    
                                                </td>
                                                </tr>
                                            )
                                        ))):(
                                            <h1>Nenhuma Solicitação</h1>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </div>
            </Content>
        </Layout>
  </Layout>
    </>
  )
}

export default Solitacao
