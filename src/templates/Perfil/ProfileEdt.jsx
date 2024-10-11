import React, { useEffect, useState } from 'react'
import '../Usuarios/Usuario.css'
import { Button, Layout, Modal } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import SideBar from '../../components/SideBar/SideBar'
import CustomHeader from '../../components/Header/Header'
import '../Login/Cadastro.css'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UsuarioService from '../../services/UsuarioService'
import ImageUploaderModal from '../../components/ImageUploader/ImageUploaderModal'

const ProfileEdit = () => {
  const navigate = useNavigate()

  const objectValues = {
    id: null,
    nome: "",
    telefone: ""
    };

  const [usuario, setUsuario] = useState(objectValues)
  const [formData, setFormData] = useState({});
  const { id } = useParams()
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const [successful, setSuccessful] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [chosenImage, setChosenImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const setChosenFile = (dataFile) => {
    setFile(dataFile);
}

const setImage = (dataImage) => {
    setChosenImage(dataImage);
}


const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setUsuario(usuario => ({ ...usuario, [name]: value }));
}
const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
            setChosenImage(reader.result);
            setFile(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
    }
};
  // Função para buscar os dados do usuário ao carregar o componente
  useEffect(() => {
    UsuarioService.findById(id)
      .then((response) => {
        const usuario = response.data
        setUsuario(usuario)
        console.log(usuario)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id])

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('')  
    const formDataWithImage = { ...formData, foto: chosenImage };


    UsuarioService.updateComImagem(id, usuario, file)
      .then((response) => {
        setMessage(response.data.message)
        setSuccessful(true)
        navigate('/user')
      })
      .catch((error) => {
        const respMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString()
        setMessage(respMessage)
        setSuccessful(false)
      })
  }

  console.log(usuario);
  

  // Função para inativar o usuário
  const inativar = () => {
    UsuarioService.inativar(id)
      .then(() => {
        console.log('Usuário inativado com sucesso')
      })
      .catch((error) => {
        console.log('Erro ao inativar usuário: ' + error)
      })
  }

  useEffect(() => {
    const userJson = localStorage.getItem('user')
    console.log(userJson)
  }, [])

  return (
    <Layout className='body'>
      <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
        <SideBar />
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className='triger-btn'
        />
      </Sider>
      <Layout>
        <Header className='header'>
          <CustomHeader />
        </Header>
        <Content className='content'>
          <div className='container_user'>
            <div className='title'>Edição de Perfil</div>
            <form id='form' onSubmit={handleSubmit}>
              {!successful && (
                <>
                  <div className='user-detalis'>
                    <div className='input-box'>
                      <span className='detalis'>Nome</span>
                      <input
                        className='required'
                        type='text'
                        name='nome'
                        value={usuario.nome}
                        onChange={handleChange}
                      />
                      <span className='span'>Nome deve ter no mínimo 3 caracteres</span>
                    </div>

                    <div className='input-box'>
                      <span className='detalis'>Email</span>
                      <input
                        className='required'
                        type='email'
                        name='email'
                        value={usuario.email}
                        onChange={handleChange}
                      />
                      <span className='span'>Email inválido</span>
                    </div>

                    <div className='input-box'>
                      <span className='detalis'>Telefone</span>
                      <input
                        className='required'
                        type='tel'
                        name='telefone'
                        value={usuario.telefone}
                        onChange={handleChange}
                      />
                      <span className='span'>Telefone inválido</span>
                    </div>

                    <div className='input-box'>
                      <span className='detalis'>CPF</span>
                      <input
                        className='required'
                        type='text'
                        name='cpf_cnpj'
                        value={usuario.cpf_cnpj}
                        onChange={handleChange}
                      />
                      <span className='span'>CPF inválido</span>
                    </div>

                    <div className='input-box'>
                      <span className='detalis'>Senha</span>
                      <input
                        className='required'
                        type='password'
                        name='senha'
                        value={usuario.senha}
                        onChange={handleChange}
                      />
                      <span className='span'>Senha deve ter no mínimo 8 caracteres</span>
                    </div>

                    <div className='input-box'>
                      <span className='detalis'>Imagem de Perfil</span>
                      
                        
                        <Button onClick={() => setIsModalVisible(true)}>Selecionar Imagem</Button>
                                            <Modal
                                                title="Upload de Imagem"
                                                visible={isModalVisible}
                                                onCancel={() => setIsModalVisible(false)}
                                                footer={null}
                                            >

                                                <ImageUploaderModal
                                                setFile={setChosenFile}
                                                setImage={setImage} 
                                                chosenImage={chosenImage} />
                                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                                {chosenImage && <img src={chosenImage} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                                            </Modal>
                      

                      
                    </div>
                  </div>

                  <div className='button'>
                    <input type='submit' value='Salvar Alteração' />
                  </div>

                  <div className='button'>
                    <Link to={`/user`}>
                      <a>Voltar</a>
                    </Link>
                  </div>
                </>
              )}
              {message && (
                <div className='m-1'>
                  <div
                    className={
                      'text-center h4 fst-italic py-4 rounded-2 border border-5 ' +
                      (successful ? 'border-success' : 'border-danger')
                    }
                  >
                    {message}
                  </div>
                </div>
              )}
            </form>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default ProfileEdit
