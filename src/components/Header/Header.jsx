import React from 'react'
import { Flex, Typography, Avatar } from 'antd'
import Search from 'antd/es/transfer/search'
import {AppstoreOutlined, MoonOutlined, UserOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'

import './Header.css'
import UsuarioService from '../../services/UsuarioService'

const CustomHeader = () => {
const user = UsuarioService.getCurrentUser();
 const id = user.id;
  return (
    <>
      <Flex align='center' justify='center' gap="3rem" >

      <Search
    placeholder="Digite algo"
    size="large"
    onSearch={(value) => console.log(value)}
    className="custom-search"
  />

        <Flex align='center' gap="3rem">

            <Flex align='center' gap="10px">
                <AppstoreOutlined style={{fontSize: '25px'}} />
                <MoonOutlined style={{fontSize: '25px'}}/>
                <Link to={`/ongPerfil/${id}`}> <Avatar style={{fontSize: '25px'}} icon={<UserOutlined/>}/> </Link>            
            </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CustomHeader
