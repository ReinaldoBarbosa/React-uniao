import React, { useEffect, useState } from 'react'
import './NovoEvento.css'
import { Button, Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import { Content, Header } from 'antd/es/layout/layout'
import CustomHeader from '../../components/Header/Header'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import EventoService from '../../services/EventoService'
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../../services/UsuarioService'
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal"

const NovoEvento = () => {
    const navigate = useNavigate();

    const usuario = UsuarioService.getCurrentUser();
    const [foto, setFoto] = useState(null);

    const [file, setFile] = useState("");

    const [formData, setFormData] = useState({});
      
    const [errors, setErrors] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const [chosenImage, setChosenImage] = useState();


    const previewImage = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = () => {
            console.log("Imagem carregada com sucesso!");
            setFoto(reader.result); // Aqui a imagem é convertida para base64 e armazenada no estado
          };
    
          reader.onerror = (error) => {
            console.error("Erro ao carregar a imagem: ", error);
          };
    
          reader.readAsDataURL(file);
        } else {
          console.log("Nenhum arquivo selecionado.");
        }
      };

      const setChosenFile = (dataFile) => {
        setFile(dataFile);
    }

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    }

      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(formData => ({ ...formData, [name]: value }));
       
        
    }

      const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        console.log(formData);
            EventoService.create(file, formData, usuario.email).then(
            (response) => {
              setMessage(response.data.message);
              setSuccessful(true);
  
                alert("Evento criado com sucesso");
                navigate('/eventos');
            
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
  
    const goTo = () => {
        navigate('/eventos')
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
                <div className="container-new">
                    <header className='header-new'>
                        <h1>Criar Evento</h1>
                        <a onClick={goTo} className="btn-voltar">Voltar</a>
                    </header>
                    <div className="form-wrapper">
                        <form  className="evento-form" on onSubmit={handleSubmit}>
                            {!successful && (
                                <>
                                    <div className="form-group">
                                        <label for="nome">Nome do Evento</label>
                                        <input type="text" id="nome" name="nome" required
                                               value={formData.nome || ""}
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="form-group compact">
                                        <div className="form-group-half">
                                            <label for="Cep">Cep</label>
                                            <input type="text" id="cep" name="cep" required
                                                   value={formData.cep}
                                                   onChange={handleChange}/>
                                        </div>
                                        <div className="form-group-half">
                                            <label for="vagas">Vagas</label>
                                            <input type="text" id="vagas" name="vagas" required
                                                   value={formData.vagas}
                                                   onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group compact">
                                        <div className="form-group-half">
                                            <label for="data">Data</label>
                                            <input type="date" id="data" name="dataEvento" required
                                                   value={formData.dataEvento}
                                                   onChange={handleChange}/>
                                        </div>
                                        <div className="form-group-half">
                                            <label for="hora">Hora</label>
                                            <input type="time" id="hora" name="horaInicio" required
                                                   value={formData.horaInicio}
                                                   onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group compact">
                                        <div className="form-group-half">
                                            <label for="nome">Numero</label>
                                            <input type="text" id="numero" name="numero" required
                                                value={formData.numero || ""}
                                                onChange={handleChange}/>                                     
                                        </div>
                                        <div className="form-group-half">
                                            <label for="status">Status</label>
                                            <select id="status" name="status" required defaultValue={''} onChange={(e) => handleChange(e)}>
                                                <option value={''} disabled>
                                                   Nível de Acesso...
                                                </option>
                                                <option value="ATIVO">Ativo</option>
                                                <option value="INATIVO">Inativo</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="informacoes">Informações</label>
                                        <textarea id="informacoes" name="infos" rows="4" required
                                        value={formData.infos}
                                        onChange={handleChange}></textarea>
                                    </div>

                                    <div className="foto-wrapper">
                                    <ImageUploaderModal
                                    setFile={setChosenFile}
                                    setImage={setImage} 
                                    chosenImage={chosenImage} />
                                </div>
                                    <button type="submit" className="btn-criar">Criar Evento</button>
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

export default NovoEvento
