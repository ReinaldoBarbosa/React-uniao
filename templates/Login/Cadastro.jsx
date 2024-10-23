import React, { useState, useEffect } from 'react';
import bg from '../../assets/img/Login/cad.svg'
import './Cadastro.css'
import SideBar from '../../components/SideBar/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import UsuarioService from '../../services/UsuarioService'

const Cadastro = () => {

    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        nivelAcesso : "ONG"
      });
      
      const [errors, setErrors] = useState({});
      const [successful, setSuccessful] = useState(false);
      const [message, setMessage] = useState('');
    
      useEffect(() => {
        const userJson = localStorage.getItem('user');
        console.log(userJson);
      }, []);
    
      const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(formData => ({ ...formData, [name]: value }));
    }
  
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setSuccessful(false);

      UsuarioService.create(formData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            const userJson = localStorage.getItem("user");
            navigate('/analytics'),{state:{user: userJson}};
          
          }, (error) => {
              const message = error.response.data.message;
              setMessage(message);
          }
      )
  }

  useEffect(()=>{
    const userJson = localStorage.getItem("user");
    console.log(userJson);
  })

    const senha = document.getElementById("form");
    const telefone = document.getElementById("telefone");
    const campos = document.querySelectorAll(".required");
    const spans = document.getElementById("span");

    function setError(index) {
      campos[index].style.border = "2px solid #e63636";
      spans[index].style.display = "block";
    }

    function removeError(index) {
      campos[index].style.border = "2px solid #51C49E";
      spans[index].style.display = "none";
    }

    const validaNome = () => {
      if (campos[0].value.length < 3) {
        setError(0);
      } else {
        removeError(0);
      }
    }

   
    

  return (
    <div className='body_cad'>

        <div className="img">
            <img src={bg}/>
        </div>

        <div className="container_cad">
            <div className="title">Cadastro</div>
            <form id="form" onSubmit={handleSubmit}>
                {!successful && (
                    <>
                        <div className="user-detalis">
                            <div className="input-box">
                                <span className="detalis">Nome da Ong</span>
                                <input className="required" type="text" placeholder="Digite seu nome da ong"name="nome"
                                            value={formData.nome || ""}
                                            
                                            onChange={handleChange}/>
                                <span id='span' className="span">Nome deve ter no mínimo 3 caracteres</span>
                            </div>

                            <div className="input-box">
                                <span className="detalis">Email</span>
                                <input className="required" type="email" placeholder="Digite seu email"  name="email"
                                            value={formData.email || ""}
                                            onChange={handleChange} />
                                <span className="span">Email Inválido</span>    
                            </div>


                            <div className="input-box">
                                <span className="detalis">Telefone</span>
                                <input  id="telefone" className="required" type="tel" placeholder="(xx) xxxxx-xxxx" name="telefone"
                                            value={formData.telefone || ""}
                                            onChange={handleChange} />
                                <span className="span">Telefone Inválido</span>    

                            </div>

                            <div className="input-box">
                                <span className="detalis">CNPJ</span>
                                <input className="required" type="text" placeholder="Digite o CNPJ" name="cpf_cnpj"
                                            value={formData.cpf_cnpj || ""}
                                            
                                            onChange={handleChange}/> 
                                <span className="span">CNPJ Inválido</span>    

                            </div>

                            <div className="input-box">
                                <span className="detalis">Senha</span>
                                <input className="required" type="password" placeholder="Digite uma senha segura" name="senha"
                                            value={formData.senha || ""}
                                            onChange={handleChange}   />
                                <span className="span">Senha deve ter no mínimo 6 caracteres</span>    
                            </div>

                            <div className="input-box">
                                <span className="detalis">Confirma Senha</span>
                                <input type="password" className="required" placeholder="Digite novamente sua senha" name="confirmaSenha"/>
                                <span className="span">A senha deve ser correspondente</span>    
                            </div>

                            
                        </div>
                        <div className="button">
                            <input type="submit" value="Cadastrar"/>
                        </div>

                        <div className="button">
                            
                            <Link to={'/'}>Voltar</Link>
                        </div>
                    </>
                )}
                {message && (
                    <div className="m-1">
                    <div className={
                        "text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")
                    }>
                        {message}
                    </div>
                </div>
                )}
            </form>
        </div>
    </div>
  )
}

export default Cadastro
