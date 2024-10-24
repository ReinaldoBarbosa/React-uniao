import React, { useEffect, useState } from 'react';
import './NovoEvento.css';
import { Avatar, Button, Layout, Modal } from 'antd';
import Sider from 'antd/es/layout/Sider';
import SideBar from '../../components/SideBar/SideBar';
import { Content, Header } from 'antd/es/layout/layout';
import CustomHeader from '../../components/Header/Header';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import EventoService from '../../services/EventoService';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
import ImageUploaderModal from "../../components/ImageUploader/ImageUploaderModal";

const NovoEvento = () => {
    const navigate = useNavigate();
    const usuario = UsuarioService.getCurrentUser();
    const [foto, setFoto] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({});
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const [chosenImage, setChosenImage] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o texto de busca
    const [selectedOng, setSelectedOng] = useState(''); // Estado para armazenar a ONG selecionada
    const [selectedOngEmail, setSelectedOngEmail] = useState(''); // Estado para armazenar o email da ONG selecionada
    const [filteredUsers, setFilteredUsers] = useState([]); // Estado para armazenar usuários filtrados

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        
        // Filtra usuários baseados no termo de busca
        const filtered = usuarios.filter((user) => 
            user.nivelAcesso === "ONG" &&
            user.nome.toLowerCase().includes(searchValue.toLowerCase())
        );
        
        setFilteredUsers(filtered); // Atualiza a lista de usuários filtrados
    };

    const handleSelect = (user) => {
        setSelectedOng(user.nome); // Define o nome da ONG selecionada
        setSelectedOngEmail(user.email); // Define o email da ONG selecionada
        setSearchTerm(user.nome); // Atualiza o campo de texto com o nome selecionado
        setFilteredUsers([]); // Esconde a lista de sugestões após selecionar
    };

    const setChosenFile = (dataFile) => {
        setFile(dataFile);
    };

    const setImage = (dataImage) => {
        setChosenImage(dataImage);
    };

    useEffect(() => {
        UsuarioService.findAll().then(
            (response) => {
                const usuarios = response.data;
                setUsuarios(usuarios);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        const formDataWithImage = { ...formData, foto: chosenImage };

        // Define o email do responsável pelo evento: ou a ONG selecionada ou o próprio usuário logado
        const responsavelEmail = usuario.nivelAcesso === "ADM" && selectedOngEmail
            ? selectedOngEmail 
            : usuario.email;

        EventoService.create(file, formDataWithImage, responsavelEmail).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                alert("Evento criado com sucesso");
                navigate('/eventos');
            },
            (error) => {
                const message = error.response.data.message;
                setMessage(message);
            }
        );
    };

    const goTo = () => {
        navigate('/eventos');
    };

    return (
        <Layout className="body">
            <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
                <SideBar />
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
            </Sider>
            <Layout>
                <Header className='header'>
                    <CustomHeader />
                </Header>
                <Content className='content'>
                    <div className="container-new">
                        <header className='header-new'>
                            <h1>Criar Evento</h1>
                            <a onClick={goTo} className="btn-voltar">Voltar</a>
                        </header>
                        <div className="form-wrapper">
                            <form className="evento-form" onSubmit={handleSubmit}>
                                {!successful && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome do Evento</label>
                                            <input type="text" id="nome" name="nome" required
                                                value={formData.nome || ""}
                                                onChange={handleChange} />
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="cep">Cep</label>
                                                <input type="text" id="cep" name="cep" required
                                                    value={formData.cep || ""}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="vagas">Vagas</label>
                                                <input type="text" id="vagas" name="vagas" required
                                                    value={formData.vagas || ""}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="data">Data</label>
                                                <input type="date" id="data" name="dataEvento" required
                                                    value={formData.dataEvento || ""}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="hora">Hora</label>
                                                <input type="time" id="hora" name="horaInicio" required
                                                    value={formData.horaInicio || ""}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="numero">Número</label>
                                                <input type="text" id="numero" name="numero" required
                                                    value={formData.numero || ""}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="status">Status</label>
                                                <select id="status" name="status" required defaultValue={''} onChange={handleChange}>
                                                    <option value={''} disabled>
                                                        Nível de Acesso...
                                                    </option>
                                                    <option value="ATIVO">Ativo</option>
                                                    <option value="INATIVO">Inativo</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Exibir seleção de ONG apenas para ADM */}
                                        {usuario.nivelAcesso === "ADM" && (
                                            <div className="form-group-half" style={{ position: 'relative' }}>
                                                <label htmlFor="ong">Ong</label>
                                                <input
                                                    type="text"
                                                    placeholder="Digite o nome da ONG"
                                                    value={searchTerm}
                                                    onChange={handleSearch}
                                                    style={{ marginBottom: '10px', width: '100%' }}
                                                />
                                                {filteredUsers.length > 0 && (
                                                    <ul className="suggestions-list" style={{
                                                        listStyleType: 'none', 
                                                        padding: 0, 
                                                        margin: 0, 
                                                        border: '1px solid #ccc', 
                                                        maxHeight: '150px', 
                                                        overflowY: 'auto', 
                                                        position: 'absolute', 
                                                        zIndex: 10, 
                                                        width: '100%',
                                                        backgroundColor: '#fff'
                                                    }}>
                                                        {filteredUsers.map((user) => (
                                                            <li 
                                                                key={user.id}
                                                                onClick={() => handleSelect(user)} 
                                                                style={{
                                                                    padding: '10px', 
                                                                    cursor: 'pointer', 
                                                                    borderBottom: '1px solid #ccc'
                                                                }}
                                                            >
                                                                <img 
                                                                    className="img_perfil" 
                                                                    src={user.fotoPerfil ? 'data:image/jpeg;base64,' + user.fotoPerfil : <Avatar />} 
                                                                    alt="..." 
                                                                    style={{ width: '20px', height: '20px', borderRadius: '50%', marginRight: '8px' }}
                                                                />   
                                                                {user.nome}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="informacoes">Informações</label>
                                            <textarea id="informacoes" name="infos" rows="4" required
                                                value={formData.infos || ""}
                                                onChange={handleChange}></textarea>
                                        </div>

                                        <div className="foto-wrapper">
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
                                                    chosenImage={chosenImage}
                                                />
                                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                                {chosenImage && <img src={chosenImage} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                                            </Modal>
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
    );
};

export default NovoEvento;
