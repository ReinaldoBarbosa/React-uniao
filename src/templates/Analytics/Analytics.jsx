import React from 'react'
import {useState, useEffect } from 'react';
import MainContent from '../../components/Analytics/MainContent';
import SideContent from '../../components/Analytics/SideContent'
import { Flex, Typography } from 'antd'
import Widget from '../../components/Widget/Widget';
import PerfilRevision from '../../components/Table/Table';


const Analytics = () => {

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
      <SideContent/>
    </>
  )
}

export default Analytics
