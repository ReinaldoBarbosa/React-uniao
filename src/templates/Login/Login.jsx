import React, { useState, useEffect } from 'react';
import './Login.css'

import Wave from '../../assets/img/Login/wave.png'
import Avatar from '../../assets/img/Login/avatar (1).svg' 
import Bg from '../../assets/img/Login/bg.svg' 
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const Login = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('');
    const [focus, setFocus] = useState({
        email: false,
        password: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    useEffect(() => {
        const userJson = localStorage.getItem("user");
        console.log(userJson);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        UsuarioService.signin(formData.email, formData.password).then(
            () => {
                const userJson = localStorage.getItem("user");
                console.log(userJson);
                const user = JSON.parse(userJson || '{}');

                // Verifica o status do usuário para redirecionar
                if (user.statusUsuario === 'ATIVO') {
                    navigate('/analytics', { state: { user: userJson } });
                } else if (user.statusUsuario === 'TROCAR_SENHA') {
                    navigate(`/newpass/` + user.id);
                }

            },
            (error) => {
                const respMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(respMessage);
            }
        );
    };

    const handleFocus = (field) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field) => {
        if (!formData[field]) {
            setFocus({ ...focus, [field]: false });
        }
    };

    return (
        <div>
            <img className="wave" src={Wave} alt="onda decorativa" />
            <div className="container-login">
                <div className="img">
                    <img src={Bg} alt="imagem de fundo" />
                </div>

                <div className="login-container">
                    <form className='form_login' onSubmit={handleSubmit}>
                        <img className="avatar" src={Avatar} alt="avatar do usuário" />
                        <h2>Bem-vindo</h2>

                        <div className={`input-div one ${focus.email ? 'focus' : ''}`}>
                            <div className="i">
                                <i className="fas fa-user"></i>
                            </div>
                            <div>
                                <h5>Email</h5>
                                <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('email')}
                                    onBlur={() => handleBlur('email')}
                                />
                            </div>
                        </div>

                        <div className={`input-div two ${focus.password ? 'focus' : ''}`}>
                            <div className="i">
                                <i className="fas fa-lock"></i>
                            </div>
                            <div>
                                <h5>Senha</h5>
                                <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    value={formData.password || ""}
                                    onChange={handleChange}
                                    onFocus={() => handleFocus('password')}
                                    onBlur={() => handleBlur('password')}
                                />
                            </div>
                        </div>

                        <div className="alerta">
                            {message && (
                                <div className="fw-bold fs-5 text-danger">
                                    <span>{message}</span>
                                </div>
                            )}
                        </div>

                        <a href="/esquecisenha">Esqueceu a senha?</a>
                        <button type="submit" className="btn_login">
                            Entrar
                        </button>
                        <button type="button" className="btn_login" onClick={() => navigate('/cadastro')}>
                            Cadastrar-se
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
