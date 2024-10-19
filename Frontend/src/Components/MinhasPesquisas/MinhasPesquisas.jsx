import { useState, useEffect, useCallback } from 'react';
import { ClipboardList } from 'lucide-react';
import Modal from './Modal';
import "./MinhasPesquisas.css";

const MinhasPesquisas = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaAtualId, setPesquisaAtualId] = useState(null);
  const [respostas, setRespostas] = useState({});
  const [pesquisasFinalizadas, setPesquisasFinalizadas] = useState({});

  useEffect(() => {
    const fetchPesquisas = async () => {
      setIsLoading(true);
      try {
        const response = await new Promise(resolve => 
          setTimeout(() => resolve([
            { id: 1, titulo: "Satisfação do Cliente", descricao: "Avaliação da satisfação dos clientes com nossos serviços", perguntas: [{ pergunta: "Como você avalia nosso atendimento?", alternativas: ["Excelente", "Bom", "Regular", "Ruim"] },{ pergunta: "O que você achou da qualidade do produto?", alternativas: ["Muito boa", "Boa", "Regular", "Ruim"] }] },
            { id: 2, titulo: "Feedback do Produto", descricao: "Coleta de opiniões sobre nosso novo produto", perguntas: [{ pergunta: "O que você achou da qualidade do produto?", alternativas: ["Muito boa", "Boa", "Regular", "Ruim"] }] },
            { id: 3, titulo: "Pesquisa de Mercado", descricao: "Análise das tendências de mercado em nossa área", perguntas: [{ pergunta: "Qual característica você mais valoriza em um produto?", alternativas: ["Preço", "Qualidade", "Inovação", "Sustentabilidade"] }] },
          ]), 1000)
        );
        setPesquisas(response);
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

  const atualizarRespostas = useCallback((pesquisaId, novasRespostas) => {
    setRespostas(prevRespostas => ({
      ...prevRespostas,
      [pesquisaId]: novasRespostas
    }));
  }, []);

  const finalizarPesquisa = useCallback((pesquisaId) => {
    setPesquisasFinalizadas(prev => ({
      ...prev,
      [pesquisaId]: true
    }));
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
        <p className="no-pesquisas">Você ainda não tem pesquisas criadas.</p>
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
                <div className={`pesquisa-status ${pesquisasFinalizadas[pesquisa.id] ? 'finalizada' : 'em-andamento'}`}>
                  {pesquisasFinalizadas[pesquisa.id] ? 'Finalizada' : 'Em andamento'}
                </div>
              </div>
              <button className="ver-detalhes-btn" onClick={() => abrirModal(pesquisa.id)}>
                {pesquisasFinalizadas[pesquisa.id] ? "Ver respostas" : "Responder"}
              </button>
            </div>
          ))}
        </div>
      )}

      {modalAberto && pesquisaAtual && (
        <Modal 
          pesquisa={pesquisaAtual} 
          onClose={fecharModal} 
          respostas={respostas[pesquisaAtual.id] || {}}
          onRespostasChange={atualizarRespostas}
          finalizada={pesquisasFinalizadas[pesquisaAtual.id]}
          onFinalizar={finalizarPesquisa}
        />
      )}
    </div>
  );
};

export default MinhasPesquisas;