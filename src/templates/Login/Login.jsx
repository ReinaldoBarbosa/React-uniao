import React, { useState } from 'react';
import './Login.css'

import Wave from '../../assets/img/Login/wave.png'
import Avatar from '../../assets/img/Login/avatar (1).svg' 
import Bg from '../../assets/img/Login/bg.svg' 
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../../services/UsuarioService';

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(formData => ({ ...formData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        UsuarioService.signin(formData.email, formData.password).then(
            () => {
                const userJson = localStorage.getItem("user");
                const user = JSON.parse(userJson || '{}');
                if (user.statusUsuario == 'ATIVO') {
                    navigate('/home');
                } else if (user.statusUsuario == 'TROCAR_SENHA') {
                    navigate(`/newpass/` + user.id);
                    //window.location.reload(); ordnael@email.com.br
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

  return (
    <div>
      <img className="wave" src={Wave} alt="onda decorativa"/>
      <div className="container-login">
        <div className="img">
          <img src={Bg} alt="imagem de fundo"/>
        </div>

        <div className="login-container">
          <form action="" onSubmit={handleSubmit}>
            <img className="avatar" src={Avatar} alt="avatar do usuário"/>
            <h2>Bem-vindo</h2>
            
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <h5 htmlFor="email">Email</h5>
                <input className="input" type="email" id="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}/>
              </div>
            </div>

            <div className="input-div two">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div>
                <h5 htmlFor="senha">Senha</h5>
                <input type="password" className="input" id="senha"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}/>
              </div>
            </div>

            <div className="alerta">
                    {message && (
                        <div className="fw-bold fs-5 text-danger">
                            <span>{message}</span>
                        </div>
                    )}
                </div>
            
            <a href="">Esqueceu a senha?</a>
            <button type="submit" value="Entrar" className="btn_login">
                Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const inputs = document.querySelectorAll('.input');

        

        function focusFunc(){
            let parent = this.parentNode.parentNode;
            parent.classList.add('focus')
        }

        function blurFunc(){
            let parent = this.parentNode.parentNode;
            if(this.value == ""){
                parent.classList.remove('focus')
            }
        }

        inputs.forEach(input =>{
            input.addEventListener('focus',focusFunc);
            input.addEventListener('blur',blurFunc);
        })

export default Login;
