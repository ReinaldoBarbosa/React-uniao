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
        let value = e.target.value;
      
        // Aplica máscara para o telefone
        if (name === 'telefone') {
          value = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
          value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Adiciona parênteses em torno do DDD
          value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Adiciona hífen após os primeiros 5 dígitos
        }
        
        // Aplica máscara para o CNPJ
        if (name === 'cpf_cnpj') {
          value = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
          value = value.replace(/^(\d{2})(\d)/, "$1.$2");
          value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
          value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
          value = value.replace(/(\d{4})(\d)/, "$1-$2");
        }
      
        setFormData(formData => ({ ...formData, [name]: value }));
      }
      
  
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
      
        // Verifica se a senha é válida
        if (!validatePassword(formData.senha)) {
          setMessage("A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula e um número.");
          return;
        }
        
        // Verifica se o CNPJ é válido
        if (!validateCNPJ(formData.cpf_cnpj)) {
          setMessage("CNPJ inválido!");
          return;
        }
      
        UsuarioService.create(formData).then(
          (response) => {
            setMessage(response.data.message);
            setSuccessful(true);
            const userJson = localStorage.getItem("user");
            navigate('/analytics', { state: { user: userJson } });
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

    const validateCNPJ = (cnpj) => {
      cnpj = cnpj.replace(/[^\d]+/g,''); // Remove qualquer caractere que não seja número
    
      if(cnpj.length !== 14) return false;
    
      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0,tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return false;
      
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return false;
      
      return true;
    }
    
    const validatePassword = (password) => {
      const minLength = password.length >= 6;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
    
      return minLength && hasUpperCase && hasNumber;
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
                                <input 
                                  id="telefone" 
                                  className="required" 
                                  type="tel" 
                                  placeholder="(xx) xxxxx-xxxx" 
                                  name="telefone"
                                  value={formData.telefone || ""}
                                  onChange={handleChange} // Aplica a função que formatará enquanto o usuário digita
                                  maxLength={15} // Limita o tamanho do telefone para o formato (xx) xxxxx-xxxx
                                  required
                                />
                                <span className="span">Telefone Inválido</span>
                              </div>


                            <div className="input-box">
                                <span className="detalis">CNPJ</span>
                                <input className="required" type="text" placeholder="Digite o CNPJ" name="cpf_cnpj" maxLength={18}
                                  value={formData.cpf_cnpj || ""}
                                  onChange={handleChange} />
                                <span className="span">{errors.cpf_cnpj}</span>    
                              </div>


                              <div className="input-box">
                                <span className="detalis">Senha</span>
                                <input className="required" type="password" placeholder="Digite uma senha segura" name="senha" maxLength={25}
                                  value={formData.senha || ""}
                                  onChange={handleChange} />
                                <span className="span">A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula e um número.</span>    
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
