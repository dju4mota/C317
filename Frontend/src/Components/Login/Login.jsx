import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username && password) {
            // Redireciona para a página de dashboard após o login bem-sucedido
            navigate('/dashboard');
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Captalis</h1>
        <p>Metrificando felicidade</p>
      </div>
      <div className="login-right">
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Logar</h1>
            <div className="input-group">
                <input 
                    type="email" 
                    placeholder='E-mail'
                    required
                    onChange={(e) => setUsername(e.target.value)}/>
                <FaUser className="icon" />
            </div>
            <div className="input-group">
                <input 
                    type="password" 
                    placeholder='Senha'
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className="icon" />
            </div>

            <div className="recall-forget">
                <label>
                    <input type="checkbox"/>
                    Lembre de mim?
                </label>
                <a href="#">Esqueceu a senha?</a>
            </div>
            <button>Entrar</button>

            <div className="signup-link">
                <p>
                    Não tem uma conta? <a href="#">Crie aqui</a>
                </p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login