import { FaUser, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../assets/logo.svg';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username && password) {
            if (username === "user@user.com" && password === "user") {
                localStorage.setItem("userType", "user"); // Armazena o tipo de usuário
                localStorage.setItem("userId", "1"); // Armazena o ID do usuário
                navigate("/dashboard/minhaspesquisas");
            } else if (username === "admin@admin.com" && password === "admin") {
                localStorage.setItem("userType", "admin"); // Armazena o tipo de usuário
                localStorage.setItem("userId", "2"); // Armazena o ID do admin
                navigate("/dashboard/gerenciar-pesquisas");
            }
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img src={logo} alt="Logo da Captalis" />
                <p>Metrificando felicidade.</p>
            </div>
            <div className="login-right">
                <form onSubmit={handleSubmit} className="login-form">
                    <h1>Logar</h1>
                    <div className="input-group">
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            name="email" 
                            required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-group">
                        <input 
                            type="password" 
                            placeholder="Senha"
                            name="password" 
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FaLock className="icon" />
                    </div>
                    <div className="recall-forget">
                        <label>
                            <input type="checkbox"/>
                            Lembre de mim?
                        </label>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                    <button type="submit">Entrar</button>
                    <div className="signup-link">
                        <p>Não tem uma conta? <a href="#">Crie aqui</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
