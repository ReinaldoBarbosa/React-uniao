import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import UsuarioService from "../../services/UsuarioService"
import '../../templates/Usuarios/Usuario.css'
import { Typography } from 'antd'
import CandidaturaServices from '../../services/CandidaturaServices'



const PerfilRevision = () => {


    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

    const [candidaturas, setCandidaturas] = useState([]);

    useEffect(() => {
        CandidaturaServices.findAll().then(
            (response) => {
                const candidaturas = response.data;
                setCandidaturas(candidaturas);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);

    const editar = (id) => {
        navigate(`/usuarioeditar/` + id)

        
    }

    return (
        <div className="d-flex">
            
            <div className="p-3 w-100">
        
            <section className="m-2 p-2 shadow-lg">
                            <div className="table-container ">
                                <div className="top_table">
                                    <Typography.Title className='title-user'>
                                        Perfis para Revisão
                                    </Typography.Title>                                         
                                </div>
                                
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">Voluntario</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">ONG</th>
                                            <th scope="col">Evento</th>                        
                                            <th scope="col">Mais</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {candidaturas?.length > 0 ? (
                                        candidaturas.map((candidatura) => (
                                            <tr key={candidatura.id}>
                                            <td>{candidatura.usuario?.nome}</td>
                                            <td>{candidatura.usuario?.email}</td>
                                            <td>{candidatura.evento?.ong?.nome}</td>
                                            <td>{candidatura.evento?.nome}</td>
                                            
                                        
                                            <td>
                                                <button onClick={() => editar(candidatura.id)}>
                                                :
                                                </button>
                                            </td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan="5">Nenhuma candidatura encontrada.</td>
                                        </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </section>
            </div>
        </div>
    )
}

export default PerfilRevision
