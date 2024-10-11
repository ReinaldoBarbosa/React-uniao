import React, { useEffect, useState } from 'react';
import { Flex, Typography, Avatar, Dropdown, Menu } from 'antd';
import Search from 'antd/es/transfer/search';
import { AppstoreOutlined, MoonOutlined, UserOutlined, LogoutOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import UsuarioService from '../../services/UsuarioService';

const CustomHeader = () => {
  const user = UsuarioService.getCurrentUser();
  const id = user.id;
  const navigate = useNavigate();  // Para redirecionar o usuário após logout

  const objectValues = {
    nome: '',
    email: '',
    nivelAcesso: '',
    fotoPerfil: null
  };

  const [usuario, setUsuario] = useState(objectValues);

  useEffect(() => {
    UsuarioService.findById(id)
      .then(response => {
        const usuario = response.data;
        setUsuario(usuario);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const handleLogout = () => {
    UsuarioService.logout();
    navigate('/');  // Redireciona para a página de login após logout
  };

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
    <>
      <Flex  align="center" justify="center" gap="3rem" style={{marginTop : '10px'}}>
        <Search
          placeholder="Digite algo"
          size="large"
          onSearch={(value) => console.log(value)}
          className="custom-search"
        />

        <Flex align='center' gap="1rem">
          <Flex align='center' gap="1rem">
            <AppstoreOutlined style={{ fontSize: '25px' }} />
            <MoonOutlined style={{ fontSize: '25px' }} />
            <Dropdown overlay={menu} trigger={['click']}>
              <Link to={`/ongPerfil/${id}`} onClick={e => e.preventDefault()} style={{ }}>
              {usuario.fotoPerfil ? (
                  <img
                    className='img-header'
                    src={'data:image/jpeg;base64,' + usuario.fotoPerfil}
                    alt="..."
                    style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex'}}
                  />
                ) : (
                  <Avatar style={{ fontSize: '25px' }} icon={<UserOutlined />} />
                )}
              </Link>
            </Dropdown>
          </Flex>
        </Flex>

      </Flex>
    </>
  );
};

export default CustomHeader;
