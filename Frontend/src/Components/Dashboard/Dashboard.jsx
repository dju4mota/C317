import { useState } from 'react';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { FaChartPie, 
  FaClipboardList, 
  FaTasks, 
  FaChartBar, 
  FaUsers,  
  FaQuestionCircle,
   FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('visao-geral'); // Use um valor padrão que corresponda à sua rota
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Navega para a página inicial
  };

  const menuItems = [
    { name: 'Visão Geral', icon: FaChartPie, route: 'visao-geral' },
    { name: 'Minhas Pesquisas', icon: FaClipboardList, route: 'minhaspesquisas' },
    { name: 'Gerenciar Pesquisas', icon: FaTasks, route: 'gerenciar-pesquisas' },
    { name: 'Relatórios', icon: FaChartBar, route: 'relatorios' },
    { name: 'Usuários', icon: FaUsers, route: 'usuarios' },
    { name: 'Ajuda', icon: FaQuestionCircle, route: 'ajuda' },
  ];

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.route} // Mude para não ter barra inicial
              className={activeItem === item.route ? 'active' : ''}
              onClick={() => setActiveItem(item.route)}
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
          <Outlet /> {/* Renderiza o componente da rota ativa */}
        </div>
      </main>
    </div>
  );
}
