import React from 'react'
import {useState, useEffect } from 'react';
import MainContent from '../../components/Analytics/MainContent';
import SideContent from '../../components/Analytics/SideContent'


const Analytics = (props) => {
  


  return (
    <>
      (nivel == "ADM") ? <MainContent/> : <PaginaBranca/>
      <SideContent/>
    </>
  )
}

export default Analytics
