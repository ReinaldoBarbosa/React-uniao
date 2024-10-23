import React, { useState } from 'react';
import './EsqueciSenha.css';



const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    
 
    setMessage(`Um link de redefinição de senha foi enviado para ${email}`);

  };

  return (
    <div className="forgot-password-container">
      <h2>Informe o seu email</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label htmlFor="email" className="forgot-password-label">E-mail:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
          placeholder="Digite seu e-mail"
        />
        <button type="submit" className="btn_senha">Enviar</button>
      </form>
      {message && <p className="forgot-password-message">{message}</p>}
    </div>
  );
};

export default EsqueciSenha;
