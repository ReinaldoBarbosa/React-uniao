import React, { useEffect, useState } from 'react'
import { AutoComplete, Avatar, Button, Flex, List, Typography } from 'antd'
import './Activity.css'
import UsuarioService from '../../services/UsuarioService';
import Usuario from '../../templates/Usuarios/Usuario';




const Activity = () => {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        UsuarioService.findAll().then(
            (response) => {
                const usuarios = response.data;
                setUsuarios(usuarios);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <div className="activity">
        <Flex vertical gap="small">
        <Flex align='center'justify='space-between' gap='large'>
            <Typography.Title level={3} className='primary--color'>
                Recent Activity
            </Typography.Title>
            <Button type='link' className='gray--color'>
                View All
            </Button>
        </Flex>


            <List  dataSource={usuarios}  renderItem={(user, index) => (
                <List.Item className="list-item-meta">

                    <List.Item.Meta
                    className="list-item-meta"
                    avatar={<Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed?seed=${index}'}/>}
                    title={<a href='#'>{user.nome}</a>}
                    description="Recente"
                    ></List.Item.Meta>
                    
                </List.Item>
            )}/>

        
        </Flex>
        </div>
    )
}

export default Activity;