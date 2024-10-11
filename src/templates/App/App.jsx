

import { Layout, Button, Flex, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import SideBar from '../../components/SideBar/SideBar';
import CustomHeader from '../../components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Analytics from '../Analytics/Analytics'
import Email from '../Email/Email'
import ViewPage from '../ListPage/ViewPage'
import './App.css'
import MainContent from '../../components/Analytics/MainContent';
import SideContent from '../../components/Analytics/SideContent';
import { useLocation } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import EventoService from '../../services/EventoService';
import PerfilRevision from '../../components/Table/Table';
import Widget from '../../components/Widget/Widget';

const {Sider, Header, Content} = Layout;


const App = () => {

  const navigate = useNavigate();

  const user = UsuarioService.getCurrentUser();
  const [collapsed, setCollapsed] = useState(false); 
  const nivel = user.nivelAcesso;
  const userID = user.id;

  const AnalyticsOng = () =>{

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
      navigate(`/detalisEvento/` + id)
  }

    return(
      <>
      <div style={{flex: 1}}>
        <Flex vertical gap="2.3rem">

          <Flex vertical>
            <Typography.Title>
               Monitore a saúde <br /> do seu negócio
            </Typography.Title>
            <span className='primary--color'>
            Controle seus e analise dados de uma maneira mais fácil
            </span>
          </Flex>

          <div className="widgets">
            <Widget type="evento"/>  
            <Widget type="TotalSolicitacoes"/>
          </div>

          <div className="d-flex">
            
            <div className="p-3 w-100">
        
            <section className="m-2 p-2 shadow-lg">
                            <div className="table-container ">
                                <div className="top_table">
                                    <Typography.Title className='title-user'>
                                        Ultimos Eventos
                                    </Typography.Title>                                         
                                </div>
                                
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Data</th>
                                            <th scope="col">Hora</th>
                                            <th scope="col">Status</th>                        
                                            <th scope="col">Mais</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                   {/*  {nivel === "PENDENTE" ? ( */}
                                        {eventos?.length > 0 ? (
                                        
                                        eventos.map((evento) => (
                                          evento.ong.id == userID && (
                                            <tr key={evento.id}>
                                            <td>{evento.nome}</td>
                                            <td>{evento.dataEvento}</td>
                                            <td>{evento.horaInicio}</td>
                                            <td>{evento.statusEvento}</td>
                                        
                                            <td>
                                                <button onClick={() => editar(evento.id)}>
                                                :
                                                </button>
                                            </td>
                                            </tr>
                                          )
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="5">Nenhuma candidatura encontrada.</td>
                                        </tr> )}
                                    
                                
                                    </tbody>
                                </table>
                            </div>
                        </section>
            </div>
        </div>
        </Flex>
        </div>
      <SideContent/>
    </>
    )
  }
  

  



  

  return (


    <Layout className="body">
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
        <Flex gap="large">

        {(nivel == "ADM") ? <Analytics/> : <AnalyticsOng/>}
        
        </Flex>
      </Content>
    </Layout>
  </Layout>




)
}

export default App
