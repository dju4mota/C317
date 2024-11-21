import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Modal from './Modal';
import './MinhasPesquisas.css';

const API_URL = 'http://localhost:8080/api/v1/pesquisas';
const RESULTADOS_URL = 'http://localhost:8080/api/v1/resultados';

export default function MinhasPesquisas() {
  const [pesquisas, setPesquisas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pesquisasRespondidas, setPesquisasRespondidas] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pesquisaSelecionada, setPesquisaSelecionada] = useState(null);
  const [resultados, setResultados] = useState([]);
  const { userId } = useOutletContext();

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

  const fetchResultados = async () => {
    try {
      const response = await fetch(`${RESULTADOS_URL}?idUsuario=${userId}`);
      if (!response.ok) {
        throw new Error('Falha ao buscar resultados');
      }
      const resultados = await response.json();

      const respondidas = new Set(
        resultados.map(resultado => resultado.idPesquisa)
      );

      setPesquisasRespondidas(respondidas);
      setResultados(resultados);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  useEffect(() => {
    fetchPesquisas();
    fetchResultados();
  }, [userId]);

  const handleButtonClick = (pesquisa) => {
    // Encontra se há um resultado do usuário para essa pesquisa
    const resultadoDoUsuario = resultados.find(
      (resultado) =>
        resultado.idUsuario == userId && // Verifica o ID do usuário
        resultado.idPesquisa == pesquisa.id // Verifica o ID da pesquisa
    );
  
    // Determina as respostas do usuário e se a pesquisa foi finalizada
    const respostasDoUsuario = resultadoDoUsuario?.respostas || [];
    const finalizada = !!resultadoDoUsuario; // Finalizada se o resultado existir
  
    console.log("Resultado do Usuário:", resultadoDoUsuario); // Para debug
    console.log("Finalizada:", finalizada); // Para debug
  
    // Atualiza a pesquisa selecionada com as informações do resultado
    setPesquisaSelecionada({ ...pesquisa, respostasDoUsuario, finalizada });
    setIsModalOpen(true);
  };
  


  const closeModal = () => {
    setIsModalOpen(false);
    setPesquisaSelecionada(null);
  };

  const onPesquisaRespondida = (idPesquisa) => {
    setPesquisasRespondidas(prev => new Set(prev).add(idPesquisa));
  };

  if (isLoading) {
    return (
      <div className="minhas-pesquisas-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="minhas-pesquisas-container">
      <h1>Minhas Pesquisas</h1>
      {pesquisas.length === 0 ? (
        <p className="no-pesquisas">Você ainda não tem pesquisas disponíveis.</p>
      ) : (
        <div className="pesquisas-list">
          {pesquisas.map((pesquisa) => (
            <div key={pesquisa.id} className="pesquisa-item">
              <div className="pesquisa-info">
                <h2>{pesquisa.titulo}</h2>
                <p>{pesquisa.descricao}</p>
              </div>
              <button onClick={() => handleButtonClick(pesquisa)} className="responder-btn">
                {pesquisasRespondidas.has(pesquisa.id) ? "Ver Respostas" : "Responder"}
              </button>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <Modal
          pesquisa={pesquisaSelecionada}
          onClose={closeModal}
          userId={Number(userId)}
          onPesquisaRespondida={onPesquisaRespondida}
        />
      )}
    </div>
  );
}