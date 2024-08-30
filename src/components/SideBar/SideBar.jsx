import { Flex, Menu } from 'antd'
import React from 'react'
import { FaLeaf } from 'react-icons/fa6'
import {UserOutlined, HomeOutlined, MailOutlined,CalendarOutlined} from '@ant-design/icons'
import Uniao from '../../assets/img/uniao.png';
import { useNavigate } from 'react-router-dom';
const SideBar = () => {

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
        items={[
            {
                key: '1',
                icon: <HomeOutlined />,
                label: 'Deshboard',
                children: [
                    {
                        key: '/home',
                        label: 'Analytics'
                    },
                ],
            },
            
            {

                label: 'Email',
                key: '/email',
                icon: <MailOutlined />
                
            },
            {
                key: '4',
                icon: <UserOutlined/>,
                label: 'Usuario',
                children: [
                    {
                        key: '/user',
                        label: 'Ong',
                    },
                    {
                        key: '6',
                        label: 'Voluntario',
                    },
                ]
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
            
        ]} />
    </>
  )
}

function Content (){
    return (
        <div>Content</div>
    )
}

export default SideBar
