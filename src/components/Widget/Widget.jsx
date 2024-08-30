import { UserOutlined, MoreOutlined, ArrowUpOutlined } from '@ant-design/icons'
import React from 'react'
import './Widget.css'

const Widget = ({ type }) => {
  let data;

  const amount = 100000;
  const diff = 2000;

  // Switch que define os dados baseados no tipo de widget
  switch (type) {
    case "Total":
      data = {
        title: "Total de Usuarios",
        link: amount,
        icon: <UserOutlined className='icon' />
      };
      break;
    case "Abandono":
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
