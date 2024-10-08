import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import Widget from '../../components/Widget/Widget'
import PerfilRevision from '../../components/Table/Table'
import CandidaturaService from "../../services/CandidaturaService"
import './Revision.css'

const PagPerfilRevisao = () => {


    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

    const [candidaturas, setCandidaturas] = useState([]);

    useEffect(
        () => {
            CandidaturaService.findAll().then(
                (response) => {
                    const candidaturas = response.data;
                    setCandidaturas(candidaturas);
                }
            ).catch((error) => {
                console.log(error);
            })
        }, []
    )

    const openModal = (edit = false, index = 0) => {
        const modal = document.querySelector('.modal-container')
        const tbody = document.querySelector('tbody')
        const sNome = document.querySelector('#m-nome')
        const sFuncao = document.querySelector('#m-funcao')
        const sSalario = document.querySelector('#m-salario')
        const btnSalvar = document.querySelector('#btnSalvar')
        modal.classList.add('active')
      
        modal.onclick = e => {
          if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
          }
          }
      
          if (edit) {
              sNome.value = itens[index].nome
              sFuncao.value = itens[index].funcao
              sSalario.value = itens[index].salario
              id = index
            } else {
              sNome.value = ''
              sFuncao.value = ''
              sSalario.value = ''
            }
      }

    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)
    }

    const [collapsed, setCollapsed] = useState(false); 

    return (

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
                        Monitore a saúde <br /> do seu negócio
                    </Typography.Title>
                </div>
           
                <div className="d-flex">
            
                    <div className="p-3 w-100">
                
                    <section className="m-2 p-2 shadow-lg">
                                    <div className="table-container ">
                                        <div className="top_table">
                                            <Typography.Title className='title-user'>
                                                Perfis para Revisão
                                            </Typography.Title>                                         
                                        </div>
                                        
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Voluntario</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">ONG</th>
                                                    <th scope="col">Evento</th>                        
                                                    <th scope="col">Mais</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                        {/*  {nivel === "PENDENTE" ? ( */}
                                        {candidaturas.map((candidatura) => (
                                            candidatura.statusCadastro === "REPORT" ? (
                                            
                                            <tr key={candidatura.id}>
                                            <td>{candidatura.usuario?.nome}</td>
                                            <td>{candidatura.usuario?.email}</td>
                                            <td>{candidatura.evento?.ong?.nome}</td>
                                            <td>{candidatura.evento?.nome}</td>
                                            
                                        
                                            <td>
                                                <button onClick={openModal}>
                                                :
                                                </button>
                                            </td>
                                            </tr>
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">Nenhuma candidatura encontrada.</td>
                                                </tr> 
                                            )
                                        ))
                                    
                                        }
                                            
                                        
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                    </div>
                </div>


                <div class="modal-container">
                    <div class="modal">
                        <form action="">
                            <div className="form-group">
                                <label for="informacoes">Reportagem</label>
                                <textarea id="informacoes" name="infos" rows="4" required
                                        
                                ></textarea>
                            </div>

                            <div className="form-group-half">
                                <label for="status">Status</label>
                                <select id="status" name="status" required defaultValue={''} onChange={(e) => handleChange(e)}>
                                    <option value={''} disabled>
                                       Avaliação...
                                    </option>
                                    <option value="ATIVO">Ativo</option>
                                    <option value="INATIVO">Inativo</option>
                                </select>
                            </div>


                            <button type="submit" className="btn-criar">Concluir avalição</button>
                        </form>
                    </div>
                </div>
            </Content>
        </Layout>
  </Layout>
    )
}

export default PagPerfilRevisao
