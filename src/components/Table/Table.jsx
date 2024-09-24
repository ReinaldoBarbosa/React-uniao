import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import CandidaturaService from "../../services/CandidaturaService"
import '../../templates/Usuarios/Usuario.css'
import { Typography } from 'antd'



const PerfilRevision = () => {

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

                                   {/*  {nivel === "PENDENTE" ? ( */}
                                        {candidaturas.map((candidatura) => (
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
                                        ))}
                                      {/*   ) : (
                                        <tr>
                                            <td colSpan="5">Nenhuma candidatura encontrada.</td>
                                        </tr> */}
                                    
                                
                                    </tbody>
                                </table>
                            </div>
                        </section>
            </div>
        </div>
    )
}



export default PerfilRevision
