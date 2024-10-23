import { useState, useEffect, useCallback } from 'react';
import { ClipboardList } from 'lucide-react';
import Modal from './Modal';
import "./MinhasPesquisas.css";

const API_URL = 'http://localhost:3000/pesquisas';

const MinhasPesquisas = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaAtualId, setPesquisaAtualId] = useState(null);

  useEffect(() => {
    const fetchPesquisas = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Falha ao buscar pesquisas');
        }
        const data = await response.json();
        setPesquisas(data);
      } catch (error) {
        console.error("Erro ao buscar pesquisas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPesquisas();
  }, []);

  const abrirModal = useCallback((pesquisaId) => {
    setPesquisaAtualId(pesquisaId);
    setModalAberto(true);
  }, []);

  const fecharModal = useCallback(() => {
    setModalAberto(false);
    setPesquisaAtualId(null);
  }, []);

  const atualizarPesquisa = useCallback(async (pesquisaAtualizada) => {
    try {
      const response = await fetch(`${API_URL}/${pesquisaAtualizada.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pesquisaAtualizada),
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar pesquisa');
      }

      setPesquisas(prevPesquisas =>
        prevPesquisas.map(p => p.id === pesquisaAtualizada.id ? pesquisaAtualizada : p)
      );
    } catch (error) {
      console.error("Erro ao atualizar pesquisa:", error);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="minhas-pesquisas-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  const pesquisaAtual = pesquisas.find(p => p.id === pesquisaAtualId);

  return (
    <div className="minhas-pesquisas-container">
      <h1>Minhas Pesquisas</h1>
      {pesquisas.length === 0 ? (
        <p className="no-pesquisas">Você ainda não tem pesquisas disponíveis.</p>
      ) : (
        <div>
          {pesquisas.map((pesquisa) => (
            <div key={pesquisa.id} className="pesquisa-item">
              <div className="pesquisa-info">
                <h2>{pesquisa.titulo}</h2>
                <p>{pesquisa.descricao}</p>
                <div className="pesquisa-meta">
                  <ClipboardList size={16} />
                  <span>{pesquisa.perguntas.length} pergunta(s)</span>
                </div>
                <div className={`pesquisa-status ${pesquisa.finalizada ? 'finalizada' : 'em-andamento'}`}>
                  {pesquisa.finalizada ? 'Finalizada' : 'Em andamento'}
                </div>
              </div>
              <button className="ver-detalhes-btn" onClick={() => abrirModal(pesquisa.id)}>
                {pesquisa.finalizada ? "Ver respostas" : "Responder"}
              </button>
            </div>
          ))}
        </div>
      )}

      {modalAberto && pesquisaAtual && (
        <Modal 
          pesquisa={pesquisaAtual} 
          onClose={fecharModal} 
          onSave={atualizarPesquisa}
        />
      )}
    </div>
  );
};

export default MinhasPesquisas;