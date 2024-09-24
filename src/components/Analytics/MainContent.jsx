import { Flex, Typography } from 'antd'
import React from 'react'
import Widget from '../Widget/Widget'
import PerfilRevision from '../Table/Table'

const MainContent = () => {
  return (
    <>
      <div style={{flex: 1}}>
        <Flex vertical gap="2.3rem">

          <Flex vertical>
            <Typography.Title>
               Monitore a saúde <br /> do seu negócio
            </Typography.Title>
            <span className='primary--color'>
            Controle seus e analise dados de uma maneira mais fácil
            </span>
          </Flex>

          <div className="widgets">
            <Widget type="Total"/>
            <Widget type="Abandono"/>
          </div>

          <PerfilRevision/>
        </Flex>
      </div>
    </>
  )
}

export default MainContent
