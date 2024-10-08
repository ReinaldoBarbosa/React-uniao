import { UserOutlined, MoreOutlined, ArrowUpOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import './Widget.css'


import EventoService from "../../services/EventoService"
import CandidaturaService from "../../services/CandidaturaService"
import UsuarioService from '../../services/UsuarioService';

const Widget = ({ type }) => {
  let data;

  const [eventos, setEventos] = useState([]);
  const user = UsuarioService.getCurrentUser();
  const userID = user.id;
  const nivel = user.nivelAcesso;

  useEffect(() => {
      EventoService.findAll().then(
          (response) => {
              const eventos = response.data;
              setEventos(eventos);
          }
      ).catch((error) => {
          console.log(error);

      
      })
  }, []);

  const [candidaturas, setCandidaturas] = useState([]);

    useEffect(() => {
        CandidaturaService.findAll().then(
            (response) => {
                const candidaturas = response.data;
                setCandidaturas(candidaturas);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

  const totalEventos = eventos.filter(evento => evento.ong.id === userID).length;
  const totalSolicitacao = candidaturas.filter(candidatura => candidatura.ong?.id === userID).length;
  const amount = 100000;
  const diff = 2000;

  // Switch que define os dados baseados no tipo de widget
  switch (type) {
    case "TotalUser":
      data = {
        title: "Total de Usuarios",
        link: amount,
        icon: <UserOutlined className='icon' />
      };
      break;
    case "AbandonoUser":
      data = {
        title: "Abandonos",
        link: diff,
        icon: <UserOutlined className='icon' style={{
          color: "crimson", 
          backgroundColor: "#ce303070",
        }}
        />
      };
      break;
    case "evento":
      data = {
        title: "Total de Eventos",
        link: totalEventos,
        icon: totalEventos <= 0 ? (
          <UserOutlined 
            className='icon' 
            style={{
              color: "crimson", 
              backgroundColor: "#ce303070"
            }} 
          />
        ) : (
          <UserOutlined className='icon' />
        )
      };
      break;
    case "TotalSolicitacoes":
      data = {
        title: "Total de Solicitações",
        link: totalSolicitacao,
        icon: totalSolicitacao <= 0 ? (
          <UserOutlined 
            className='icon' 
            style={{
              color: "crimson", 
              backgroundColor: "#ce303070"
            }} 
          />
        ) : (
          <UserOutlined className='icon' />
        )
      };
      break;
    default:
      data = {
        title: "Indefinido",
        icon: <UserOutlined className='icon' />
      };
      break;
  }



  return (
    <div className='widget'>
      <div className="left">
        <div>{data.icon}</div>
        <span className="title">{data.title}</span>
        <span className="percentage positive">
          <ArrowUpOutlined /> {data.link}
        </span>
      </div>
      <div className="right">
        <div className="icon-info">
          <MoreOutlined />
        </div>
      </div>
    </div>
  )
}

export default Widget;
