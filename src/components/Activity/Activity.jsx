import React, { useEffect, useState } from 'react'
import { AutoComplete, Avatar, Button, Flex, List, Typography } from 'antd'
import './Activity.css'
import UsuarioService from '../../services/UsuarioService';
import CandidaturaService from '../../services/CandidaturaService';
import Usuario from '../../templates/Usuarios/Usuario';
import { Link, useNavigate } from 'react-router-dom';




const Activity = () => {

    const navigate = useNavigate();

    const user = UsuarioService.getCurrentUser();
    const nivel = user.nivelAcesso;
    const userID = user.id;

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

    const lastUsuarios = usuarios.slice(-9).reverse();


    return (
        <>
        {(nivel == "ADM") ? ( 
            <div className="activity">
                <Flex vertical gap="small">
                <Flex align='center'justify='space-between' gap='large'>
                    <Typography.Title level={3} className='primary--color'>
                       Usuarios Recentes
                    </Typography.Title>
                    <Link to={'/user'} className='gray--color'>
                        View All
                    </Link>
                </Flex>


                <List
                    dataSource={lastUsuarios}
                    renderItem={(user, index) => (
                        <List.Item className="list-item-meta">
                        <List.Item.Meta
                            className="list-item-meta"
                            avatar={user.fotoPerfil ? (
                            <img
                                className='img-header'
                                src={'data:image/jpeg;base64,' + user.fotoPerfil}
                                alt="..."
                                style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex' }}
                            />
                            ) : (
                            <Avatar style={{ width: '40px', height: '40px', borderRadius: '50%', display: 'flex' }} />
                            )}
                            title={<a href='#'>{user.nome}</a>}
                            description="Recente"
                        />
                        </List.Item>
                    )}
                    />



                
                </Flex>
            </div>
        )
        :
        (
            <div className="activity">
                <Flex vertical gap="small">
                <Flex align='center'justify='space-between' gap='large'>
                    <Typography.Title level={3} className='primary--color'>
                        Solicitações Recentes
                    </Typography.Title>
                    <Link to={'/solicitacao'} className='gray--color'>
                        View All
                    </Link>
                </Flex>

                    {candidaturas?.length > 0 ? (
                        
                        <List  dataSource={candidaturas}  renderItem={(candidatura, index) => (
                            <List.Item className="list-item-meta">
                                {candidatura.ong?.id === userID ? (
                                     <List.Item.Meta
                                     className="list-item-meta"
                                     avatar={<Avatar src={'https://api.dicebear.com/7.x/miniavs/svg?seed?seed=${index}'}/>}
                                     title={<a href='#'>{candidatura.usuario?.nome}</a>}
                                     description="Recente"
                                     >
                                         
                                     </List.Item.Meta>
                                ):(
                                    <p>Nenhuma solicitação enviada ate o momento</p>
                                )
                                
                                }                                              
                            </List.Item>
                        )}/>
                    ):
                    (
                        <p>Nenhuma solicitação disponivel</p>
                    )
                    }

                
                </Flex>
            </div>
        )}
        </>
       
    )
}

export default Activity;