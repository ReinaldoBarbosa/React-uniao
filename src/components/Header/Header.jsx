import React, { useEffect, useState, useContext } from 'react';
import { Flex, Avatar, Dropdown, Menu } from 'antd';
import Search from 'antd/es/transfer/search';
import { AppstoreOutlined, MoonOutlined, UserOutlined, LogoutOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService'; // Ajuste o caminho conforme necessário
import { UserContext } from './UserContext'; // Importar contexto de usuários
import './Header.css';

const CustomHeader = () => {
    // Acessar usuários do contexto
    const user = UsuarioService.getCurrentUser();
    const id = user.id;
    const navigate = useNavigate();  // Para redirecionar o usuário após logout
    const [searchResults, setSearchResults] = useState([]);
    const [usuario, setUsuario] = useState([]);


    const handleSearch = (value) => {
        const results = usuarios.filter(usuario => 
            usuario.nome.toLowerCase().includes(value.toLowerCase()) || 
            usuario.email.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleLogout = () => {
        UsuarioService.logout();
        navigate('/');  // Redireciona para a página de login após logout
    };

    useEffect(() => {
        UsuarioService.findById(id).then((response) => {
            setUsuario(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    // Menu para exibir as opções de perfil
    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<EyeOutlined />}>
                <Link to={`/ongPerfil/${id}`}>Visualizar Perfil</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<EditOutlined />}>
                <Link to={`/editarPerfil/${id}`}>Editar Perfil</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Flex align="center" justify="center" gap="3rem" style={{ marginTop: '10px' }}>
            <Search
                placeholder="Digite algo"
                size="large"
                onSearch={handleSearch}
                className="custom-search"
            />
            {/* Aqui você pode mostrar os resultados da busca */}
            <div className="search-results">
                {searchResults.map(result => (
                    <div key={result.id}>{result.nome} - {result.email}</div>
                ))}
            </div>
            <Flex align='center' gap="1rem">
                <AppstoreOutlined style={{ fontSize: '25px' }} />
                <MoonOutlined style={{ fontSize: '25px' }} />
                <Dropdown overlay={menu} trigger={['click']}>
                    <Link to={`/ongPerfil/${id}`} onClick={e => e.preventDefault()}>
                    {usuario.fotoPerfil ? (
                        <img
                            className='img-header'
                            src={'data:image/jpeg;base64,' + usuario.fotoPerfil}
                            alt="..."
                            style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex'}}
                        />
                        ) : (
                        <Avatar style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex' }} icon={<UserOutlined />} />
                        )}
                    </Link>
                </Dropdown>
            </Flex>
        </Flex>
    );
};

export default CustomHeader;
