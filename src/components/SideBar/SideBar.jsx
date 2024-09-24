import { Flex, Menu } from 'antd'
import React from 'react'
import { FaLeaf } from 'react-icons/fa6'
import {UserOutlined, HomeOutlined, MailOutlined,CalendarOutlined} from '@ant-design/icons'
import Uniao from '../../assets/img/uniao.png';
import { useLocation, useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';
const SideBar = () => {

    

    const data = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Dashboard',
            children: [
                {
                    key: '/analytics',
                    label: 'Analytics'
                },
            ],
        },
        
        {
            key: '7',
            label: 'Evento',
            icon: <CalendarOutlined />,
            children: [
                {

                    key: '/listpage',
                    label: 'List Page',
                },
                {
                    key: '9',
                    label: 'Solicitções',
                }
            ]
        },
        
    ]
    const dataAdm = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: 'Dashboard',
            children: [
                {
                    key: '/analytics',
                    label: 'Analytics'
                },
            ],
        },
        
        {

            label: 'E-mail',
            key: '/email',
            icon: <MailOutlined />
            
        },
        {
            key: '/usuarios',
            icon: <UserOutlined/>,
            label: 'Usuário',
            children: [
                {
                    key: '/user',
                    label: 'Usuarios',
                },
                {
                    key: '/revisao',
                    label: 'Perfil Revisão',
                },
            ]
        },
        
        {
            key: '/evento',
            label: 'Evento',
            icon: <CalendarOutlined />,
            children: [
                {

                    key: '/eventos',
                    label: 'Eventos',
                },
                {
                    key: '/solicitacao',
                    label: 'Solicitções',
                }
            ]
        },
        
    ]

    

    const objetoLogin = useLocation();
    const user = UsuarioService.getCurrentUser();
    const nivel = user.nivelAcesso;

    const items = nivel === 'ADM' ? dataAdm : data;
  

    const navigate = useNavigate();


    
    
  return (


    <>
     <Flex align='center' justify='center'>
        <div className="logo">
        <img src={Uniao} alt="Logo" style={{ width: '70px' , height: '70px'}} />
        </div>    
    </Flex> 

    <Menu 
        mode="inline" 
        defaultSelectedKeys={['1']} 
        className="menu-bar"
        onClick={(item)=>{
            //item.key
            navigate(item.key)
        }}
        items={items}
        />

    </>
  )
}

export default SideBar
