import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import UsuarioService from "../../services/UsuarioService"
import '../../templates/Usuarios/Usuario.css'
import { Typography } from 'antd'



const PerfilRevision = () => {


    const navigate = useNavigate();

    const goTo = () => {
        navigate('/usuarioeditar')
    }

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
                                        {usuarios?.map((usuario) => (
                                            <tr className="" key={usuario.id}>
                                                <td>{usuario.nome}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.nivelAcesso}</td>                               
                                                <td>
                                                    <button onClick={() => editar(usuario.id)}>
                                                        :
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
            </div>
        </div>
    )
}

export default PerfilRevision
