import React from 'react'
import { Routes, Route } from "react-router-dom"
import Principal from '../templates/Principal/Principal'
import App from '../templates/App/App'
import Analytics from '../templates/Analytics/Analytics'
import Email from '../templates/Email/Email'
import ViewPage from '../templates/ListPage/ViewPage'
import Login from '../templates/Login/Login'
import Usuario from '../templates/Usuarios/Usuario'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Principal/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<App/>}></Route>
        <Route path='/user' element={<Usuario/>}></Route>
        <Route path='/analytics' element={<App/>}></Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
