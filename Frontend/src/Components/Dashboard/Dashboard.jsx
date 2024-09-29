import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Importa o arquivo CSS

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Aqui você normalmente faria o logout do usuário (ex: limpar o token de autenticação)
        navigate('/');
    };

    return (
        <div className="dashboard">
            <h1>Bem-vindo ao Dashboard</h1>
            <p>Você fez login com sucesso.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
