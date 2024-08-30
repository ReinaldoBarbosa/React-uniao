import React from 'react'
import { Flex, Typography, Avatar } from 'antd'
import Search from 'antd/es/transfer/search'
import {AppstoreOutlined, MoonOutlined, UserOutlined} from '@ant-design/icons'

const CustomHeader = () => {
  return (
    <>
      <Flex align='center' justify='space-between' gap="3rem">

        <Search placeholder='Search DashBoard' allowClear /> 

        <Flex align='center' gap="3rem">

            <Flex align='center' gap="10px">
                <AppstoreOutlined style={{fontSize: '25px'}} />
                <MoonOutlined style={{fontSize: '25px'}}/>
                <Avatar style={{fontSize: '25px'}} icon={<UserOutlined/>}/>
            </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default CustomHeader
