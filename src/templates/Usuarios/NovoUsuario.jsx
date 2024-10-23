import React, { useEffect, useState } from 'react'
import './Usuario.css'
import { Button, Flex, Layout, Typography } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import '../Login/Cadastro.css'


import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import UsuarioService from '../../services/UsuarioService'


const NovoUsuario = () => {

  const navigate = useNavigate(); 

    const [formData, setFormData] = useState({});
      
      const [errors, setErrors] = useState({});
      const [successful, setSuccessful] = useState(false);
      const [message, setMessage] = useState('');
    
      useEffect(() => {
        const userJson = localStorage.getItem('user');
        console.log(userJson);
      }, []);
    
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(formData => ({ ...formData, [name]: value }));
    }

    
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setSuccessful(false);

      UsuarioService.create(formData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);

              alert("Usuario criado com sucesso");
              navigate('/user');
          
          }, (error) => {
              const message = error.response.data.message;
              setMessage(message);
          }
      )
  }

  useEffect(()=>{
    const userJson = localStorage.getItem("user");
    console.log(userJson);
  })

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
                />
        </Sider>
        <Layout>
            <Header className='header'>
                <CustomHeader/>
            </Header>
            <Content className='content'>
            <div>



<div className="container_user">
    <div className="title">Cadastro</div>
    <form id="form" onSubmit={handleSubmit}>
        {!successful && (
            <>
                <div className="user-detalis">
                    <div className="input-box">
                        <span className="detalis">Nome</span>
                        <input className="required" type="text" placeholder="Digite o nome do usuario "name="nome"
                                    value={formData.nome || ""}
                                    onChange={handleChange}/>
                        <span className="span">Nome deve ter no mínimo 3 caracteres</span>
                    </div>

                    <div className="input-box">
                        <span className="detalis">Email</span>
                        <input className="required" type="email" placeholder="Digite o email do usuario"  name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange} />
                        <span className="span">Email Inválido</span>    
                    </div>


                    <div className="input-box">
                        <span className="detalis">Telefone</span>
                        <input  id="telefone" className="required" type="tel" placeholder="(xx) xxxxx-xxxx" name="telefone"
                                    value={formData.telefone || ""}
                                    onChange={handleChange} />
                        <span className="span">Telefone Inválido</span>    

                    </div>

                    <div className="input-box">
                        <span className="detalis">CNPJ</span>
                        <input className="required" type="text" placeholder="Digite o CNPJ ou CPF" name="cpf_cnpj" 
                                    value={formData.cpf_cnpj || ""}
                                    onChange={handleChange}/> 
                        <span className="span">CNPJ Inválido</span>    

                    </div>

                    <div className="input-box">
                        <span className="detalis">Senha</span>
                        <input className="required" type="password" placeholder="Digite uma senha segura" name="senha"
                                    value={formData.senha || ""}
                                    onChange={handleChange}   />
                        <span className="span">Senha deve ter no mínimo 6 caracteres</span>    
                    </div>

                    <div className="input-box">
                        <span className="detalis">Nível de Acesso</span>
                        <select id="inputAcesso" className="form-select" name="nivelAcesso"
                                defaultValue={''} onChange={(e) => handleChange(e)}>

                            <option value={''} disabled>
                                            Nível de Acesso...
                            </option>
                            <option value={"ADM"}>ADMIN</option>
                            <option value={"VOLUNTARIO"}>VOLUNTÁRIO</option>
                            <option value={"ONG"}>ONG</option>
                        </select>
                    </div>

                    
                </div>
                <div className="button">
                    <input type="submit" value="Cadastrar"/>
                </div>

                <div className="button">
                    <Link to={'/user'}>
                    <a href="souOng.html">Voltar</a>
                    </Link>
                </div>
            </>
        )}
        {message && (
            <div className="m-1">
            <div className={
                "text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")
            }>
                {message}
            </div>
        </div>
        )}
    </form>
</div>
</div>

            </Content>
        </Layout>
  </Layout>
  )
}

export default NovoUsuario
