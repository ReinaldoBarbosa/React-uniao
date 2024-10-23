import React, { useState, useEffect } from 'react';
import bg from '../../assets/img/Login/cad.svg'
import './Cadastro.css'
import SideBar from '../../components/SideBar/SideBar'
import { Link, useNavigate } from 'react-router-dom'
import UsuarioService from '../../services/UsuarioService'

import { ToastContainer, toast, Bounce  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cadastro = () => {

    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        nivelAcesso: "ONG"
    });

    const notifyError = () => {
        toast.error('Erro ao Cadastar, verifique se as informações estão corretas!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,

            });
    }

    const notify = () => {
        toast.success('Ong Cadastra com Sucesso!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }




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
      validateField(name, value); // Validação enquanto digita
  };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar o formato do e-mail
        return regex.test(email);
    };

    const validateField = (fieldName, value) => {
        let fieldErrors = { ...errors };

        // Valida o e-mail
        if (fieldName === "email" && !validateEmail(value)) {
            fieldErrors.email = "E-mail inválido!";
        } else if (fieldName === "email") {
            delete fieldErrors.email;
        }

        // Validação do nome
        if (fieldName === "nome" && value.length < 3) {
            fieldErrors.nome = "Nome deve ter no mínimo 3 caracteres";
        } else if (fieldName === "nome") {
            delete fieldErrors.nome;
        }

        // Validação do telefone
        if (fieldName === "telefone" && value.length < 14) {
            fieldErrors.telefone = "Telefone inválido";
        } else if (fieldName === "telefone") {
            delete fieldErrors.telefone;
        }

        // Validação do CNPJ
        if (fieldName === "cpf_cnpj" && !validateCNPJ(value)) {
            fieldErrors.cpf_cnpj = "CNPJ inválido";
        } else if (fieldName === "cpf_cnpj") {
            delete fieldErrors.cpf_cnpj;
        }

        // Validação da senha
        if (fieldName === "senha" && !validatePassword(value)) {
            fieldErrors.senha = "A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula e um número.";
        } else if (fieldName === "senha") {
            delete fieldErrors.senha;
        }

        // Validação da confirmação de senha
        if (fieldName === "confirmaSenha" && value !== formData.senha) {
            fieldErrors.confirmaSenha = "As senhas não coincidem";
        } else if (fieldName === "confirmaSenha") {
            delete fieldErrors.confirmaSenha;
        }

        setErrors(fieldErrors); // Atualiza os erros no estado
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
    
        if (Object.keys(errors).length > 0) {
            setMessage("Corrija os erros antes de enviar o formulário.");
            return;
        }
    
        UsuarioService.create(formData).then(
            (response) => {
                setMessage(response.data.message);
                notify(); // Executa a notificação
    
                // Aguarda um tempo antes de navegar
                setTimeout(() => {
                    navigate('/login'); // Navega após a notificação ser exibida
                }, 5000); // Altere 3000 para o tempo desejado em milissegundos
            },
            (error) => {
                notifyError(); // Chama a função de notificação de erro
            }
        );
    };

    const validateCNPJ = (cnpj) => {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
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
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) return false;

        return true;
    };

    const validatePassword = (password) => {
        const minLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);

        return minLength && hasUpperCase && hasNumber;
    };


    
    return (
        <div className='body_cad'>
            <div className="img">
                <img src={bg} alt="Imagem de fundo" />
            </div>

            <div className="container_cad">
                <div className="title">Cadastro</div>
                <form id="form" onSubmit={handleSubmit}>
                    {!successful && (
                        <>
                            <div className="user-detalis">
                                <div className="input-box">
                                    <span className="detalis">Nome da Ong</span>
                                    <input
                                        className={`required ${errors.nome ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="text"
                                        placeholder="Digite o nome da Ong"
                                        name="nome"
                                        value={formData.nome || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.nome && <span className="span-error">{errors.nome}</span>}
                                </div>

                                <div className="input-box">
                                    <span className="detalis">Email</span>
                                    <input
                                        className={`required ${errors.email ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="email"
                                        placeholder="Digite seu email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="span-error">{errors.email}</span>}
                                </div>

                                <div className="input-box">
                                    <span className="detalis">Telefone</span>
                                    <input
                                        id="telefone"
                                        className={`required ${errors.telefone ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="tel"
                                        placeholder="(xx) xxxxx-xxxx"
                                        name="telefone"
                                        value={formData.telefone || ""}
                                        onChange={handleChange}
                                        maxLength={15}
                                    />
                                    {errors.telefone && <span className="span-error">{errors.telefone}</span>}
                                </div>

                                <div className="input-box">
                                    <span className="detalis">CNPJ</span>
                                    <input
                                        className={`required ${errors.cpf_cnpj ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="text"
                                        placeholder="Digite o CNPJ"
                                        name="cpf_cnpj"
                                        maxLength={18}
                                        value={formData.cpf_cnpj || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.cpf_cnpj && <span className="span-error">{errors.cpf_cnpj}</span>}
                                </div>

                                <div className="input-box">
                                    <span className="detalis">Senha</span>
                                    <input
                                        className={`required ${errors.senha ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="password"
                                        placeholder="Digite uma senha segura"
                                        name="senha"
                                        maxLength={25}
                                        value={formData.senha || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.senha && <span className="span-error">{errors.senha}</span>}
                                </div>

                                <div className="input-box">
                                    <span className="detalis">Confirma Senha</span>
                                    <input
                                        className={`required ${errors.confirmaSenha ? 'error' : ''}`} // Aplica a classe error se houver erro
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        name="confirmaSenha"
                                        value={formData.confirmaSenha || ""}
                                        onChange={handleChange}
                                    />
                                    {errors.confirmaSenha && <span className="span-error">{errors.confirmaSenha}</span>}
                                </div>

                            
                            </div>

                            <div className="button">
                                <input type="submit" value="Cadastrar" />
                            </div>

                            <div className="button">
                                <Link to={'/'}>Voltar</Link>
                            </div>
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                transition={Bounce}
                                />
                        </>
                    )}

                    {message && (
                        <div className="m-1">
                            <div className={
                                "text-center h4 fst-italic py-4 rounded-2 border border-5 " + (successful ? "border-success" : "border-danger")
                            }>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}  

export default Cadastro;
