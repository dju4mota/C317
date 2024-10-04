import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBell, FaSearch, FaFileAlt, FaChartPie, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('visao-geral');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você normalmente faria o logout do usuário (ex: limpar o token de autenticação)
    navigate('/');
  };

  const menuItems = [
    { name: 'Avisos', icon: FaBell, route: '/avisos' },
    { name: 'Pesquisas', icon: FaSearch, route: '/pesquisas' },
    { name: 'Respostas', icon: FaFileAlt, route: '/respostas' },
    { name: 'Visão Geral', icon: FaChartPie, route: '/visao-geral' },
    { name: 'Configurações', icon: FaCog, route: '/configuracoes' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.route}
              className={activeItem === item.route.slice(1) ? 'active' : ''}
              onClick={() => setActiveItem(item.route.slice(1))}
            >
              <item.icon />
              {item.name}
            </Link>
          ))}
          <button onClick={handleLogout}>
            <FaSignOutAlt />
            Sair
          </button>
        </nav>
      </aside>
      <main className="main-content">
        <div className="content-card">
          <h1>Bem-vindo ao Dashboard</h1>
          <p>Você fez login com sucesso.</p>
          <p>Conteúdo do {activeItem} será exibido aqui.</p>
        </div>
      </main>
    </div>
  );
}