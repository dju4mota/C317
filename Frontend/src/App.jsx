import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Pesquisa from './Components/Pesquisas/Pesquisa';
import VisaoGeral from './Components/VisaoGeral/VisaoGeral';
import Respostas from './Components/Respostas/Respostas';
import Configuracoes from './Components/Configuracoes/Configuracoes';

function App() {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />}>
                        {/* Defina as rotas aninhadas aqui */}
                        <Route path="visao-geral" element={<VisaoGeral />} />
                        <Route path="pesquisas" element={<Pesquisa />} />
                        <Route path="respostas" element={<Respostas />} />
                        <Route path="configuracoes" element={<Configuracoes />} />
                        {/* Adicione outras rotas aqui, se necessário */}
                    </Route>

                </Routes>
            </div>
        </Router>
    );
}

export default App;