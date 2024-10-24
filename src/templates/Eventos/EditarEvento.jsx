import React, { useEffect, useState } from 'react';
import './NovoEvento.css';
import { Button, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import SideBar from '../../components/SideBar/SideBar';
import { Content, Header } from 'antd/es/layout/layout';
import CustomHeader from '../../components/Header/Header';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import EventoService from '../../services/EventoService';
import { useNavigate, useParams } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const EditarEvento = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = {
        id: null,
        nome: "",
        dataEvento: "",
        cep: "",
        vagas: "",
        horaInicio: "",
        numero: "",
        status: "",
        infos: "",
    };

    const [evento, setEvento] = useState(initialValues);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');
    const [collapsed, setCollapsed] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvento(prevEvento => ({ ...prevEvento, [name]: value }));
    };

    useEffect(() => {
        EventoService.findById(id).then(
            (response) => {
                setEvento(response.data);
            }
        ).catch((error) => {
            console.log(error);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        if (!evento.dataEvento) {
            setMessage("Data do evento é obrigatória");
            return;
        }

        EventoService.alterarInfo(id, evento).then(
            (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                alert("Evento Alterado");
                navigate(`/detalisEvento/${id}`);
            },
            (error) => {
                const errorMessage = error.response?.data?.message || "Erro ao atualizar o evento.";
                setMessage(errorMessage);
            }
        );
    };

    const goTo = () => {
        navigate(`/detalisEvento/${id}`);
    };

    const inativar = () => {
        // Chamar o serviço correto para inativar o evento
        EventoService.inativar(id).then(
            (response) => {
                // Exibir uma mensagem de sucesso e redirecionar ou atualizar a página
                alert("Evento inativado com sucesso.");
                navigate('/eventos'); // Voltar para a lista de eventos ou página adequada
            }, 
            (error) => {
                const errorMessage = error.response?.data?.message || "Erro ao inativar o evento.";
                setMessage(errorMessage);
            }
        );
    }


    return (
        <Layout className="body">
            <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className='sider'>
                <SideBar />
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    className="trigger-btn"
                />
            </Sider>
            <Layout>
                <Header className='header'>
                    <CustomHeader />
                </Header>
                <Content className='content'>
                    <div className="container-new">
                        <header className='header-new'>
                            <h1>Editar Evento</h1>
                            <a onClick={goTo} className="btn-voltar">Voltar</a>
                        </header>
                        <div className="form-wrapper">
                            <form className="evento-form" onSubmit={handleSubmit}>
                                {!successful && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="nome">Nome do Evento</label>
                                            <input type="text" id="nome" name="nome" required
                                                defaultValue={evento.nome}
                                                onChange={handleChange} />
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="cep">Cep</label>
                                                <input type="text" id="cep" name="cep" required
                                                    value={evento.cep}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="vagas">Vagas</label>
                                                <input type="text" id="vagas" name="vagas" required
                                                    value={evento.vagas}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="data">Data</label>
                                                <input type="date" id="data" name="dataEvento" required
                                                    value={evento.dataEvento}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="hora">Hora</label>
                                                <input type="time" id="hora" name="horaInicio" required
                                                    value={evento.horaInicio}
                                                    onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="form-group compact">
                                            <div className="form-group-half">
                                                <label htmlFor="numero">Número</label>
                                                <input type="text" id="numero" name="numero" required
                                                    value={evento.numero}
                                                    onChange={handleChange} />
                                            </div>
                                            <div className="form-group-half">
                                                <label htmlFor="status">Status</label>
                                                <select id="status" name="status" required value={evento.status} onChange={handleChange}>
                                                    <option value={evento.statusEvento} disabled>
                                                        Nível de Acesso...
                                                    </option>
                                                    <option value="ATIVO">Ativo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="informacoes">Informações</label>
                                            <textarea id="informacoes" name="infos" rows="4" required
                                                value={evento.infos}
                                                onChange={handleChange}></textarea>
                                        </div>

                                        <div className="foto-wrapper">
                                            <img className="shadow-lg" src={evento.fotoEvento ? 'data:image/jpeg;base64,' + evento.fotoEvento : "Não foi"} alt="..." />
                                        </div>
                                        <button type="submit" className="btn-criar">Atualizar Evento</button>
                                        <button type="submit" onClick={() => inativar(evento.id)} className="btn-criar">Inativar</button>
                                    </>
                                )}
                                {message && (
                                    <div className="m-1">
                                        <div className={`text-center h4 fst-italic py-4 rounded-2 border border-5 ${successful ? "border-success" : "border-danger"}`}>
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default EditarEvento;
