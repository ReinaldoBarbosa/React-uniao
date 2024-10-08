import React from 'react'
import { Routes, Route } from "react-router-dom"
import Principal from '../templates/Principal/Principal'
import App from '../templates/App/App'
import Email from '../templates/Email/Email'
import Login from '../templates/Login/Login'
import Usuario from '../templates/Usuarios/Usuario'
import Cadastro from '../templates/Login/Cadastro'
import PagPerfilRevisao from '../templates/PerfilRevision/PagPerfilRevisao'
import Solitacao from '../templates/Solicitacao/Solitacao'
import Eventos from '../templates/Eventos/Eventos'
import PerfilVoluntario from '../templates/Perfil/PerfilVoluntario'
import PerfilOng from '../templates/Perfil/PerfilOng'
import DetalisEvento from '../templates/Eventos/DetaisEvento'
import NovoUsuario from '../templates/Usuarios/NovoUsuario'
import EditarUsuario from '../templates/Usuarios/EditarUsuario'
import NovoEvento from '../templates/Eventos/NovoEvento'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Principal/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/analytics' element={<App/>}></Route>
        <Route path='/user' element={<Usuario/>}></Route>
        <Route path='/email' element={<Email/>}></Route>
        <Route path='/eventos' element={<Eventos/>}></Route>
        <Route path='/cadastro' element={<Cadastro/>}></Route>
        <Route path='/Revisao' element={<PagPerfilRevisao/>}></Route> 
        <Route path='/solicitacao' element={<Solitacao/>}></Route> 
        <Route path='/perfil1/:id' element={<PerfilVoluntario/>}></Route> 
        <Route path='/ongPerfil/:id' element={<PerfilOng/>}></Route> 
        <Route path='/detalisEvento/:id' element={<DetalisEvento/>}></Route> 
        <Route path='/novoUser' element={<NovoUsuario/>}></Route> 
        <Route path='/novoEvento' element={<NovoEvento/>}></Route> 
        <Route path='/usuarioeditar/:id' element={<EditarUsuario/>}></Route> 
      </Routes>
    </div>
  )
}

export default AppRoutes
