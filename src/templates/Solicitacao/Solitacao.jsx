import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import CandidaturaService from "../../services/CandidaturaService"
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import Widget from '../../components/Widget/Widget'

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

    const [collapsed, setCollapsed] = useState(false); const [usuarios, setUsuarios] = useState([]);

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
                                            <th scope="col">Voluntario</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Evento</th>                        
                                            <th scope="col">Aceitação</th>                        
                                            <th scope="col">Mais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {candidaturas.map((candidatura) => (
                                            <tr key={candidatura.id}>
                                            <td>{candidatura.usuario?.nome}</td>
                                            <td>{candidatura.usuario?.email}</td>
                                            <td>{candidatura.evento?.nome}</td>
                                            <td><a href="#">A</a>
                                                <a href="#">X</a>
                                            </td>
                                            
                                        
                                            <td>
                                                <button onClick={() => editar(candidatura.id)}>
                                                :
                                                </button>
                                            </td>
                                            </tr>
                                        ))}
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
