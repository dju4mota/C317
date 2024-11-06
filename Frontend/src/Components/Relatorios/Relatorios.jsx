import { useState, useEffect } from 'react';
import './Relatorios.css';

const API_URL_PESQUISAS = 'http://localhost:8080/api/v1/pesquisas';
const API_URL_RESULTADOS = 'http://localhost:8080/api/v1/resultados';

const Relatorios = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pesquisasResponse, resultadosResponse] = await Promise.all([
          fetch(API_URL_PESQUISAS),
          fetch(API_URL_RESULTADOS)
        ]);

        if (!pesquisasResponse.ok || !resultadosResponse.ok) {
          throw new Error('Falha ao buscar dados');
        }

        const pesquisasData = await pesquisasResponse.json();
        const resultadosData = await resultadosResponse.json();

        setPesquisas(pesquisasData);
        setResultados(resultadosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError('Falha ao carregar os dados. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calcularEstatisticas = (pesquisa) => {
    const resultadosPesquisa = resultados.filter(res => res.idPesquisa === pesquisa.id);

    const estatisticasPorPergunta = pesquisa.perguntas.map((pergunta, index) => {
      const perguntaId = pergunta.id_pergunta || `pergunta-${index}`;

      const contagemAlternativas = pergunta.alternativas.map((alt, altIndex) => {
        const contagem = resultadosPesquisa
          .flatMap(res => res.respostas)
          .filter(resp => resp.id_pergunta === pergunta.id_pergunta && resp.alternativaEscolhida === alt)
          .length;

        return { texto: alt, contagem, id: `${perguntaId}-${altIndex}` };
      });

      const alternativaMaisEscolhida = contagemAlternativas.reduce((prev, current) =>
        (prev.contagem > current.contagem) ? prev : current,
        { texto: '', contagem: 0 }
      );

      return {
        perguntaId,
        descricao: pergunta.descricao,
        alternativaMaisEscolhida,
        contagemAlternativas
      };
    });

    return { estatisticasPorPergunta };
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="relatorios-container">
      <h1>Relatórios de Pesquisas</h1>
      {pesquisas.map(pesquisa => {
        const { estatisticasPorPergunta } = calcularEstatisticas(pesquisa);
        return (
          <div key={pesquisa.id} className="pesquisa-relatorio">
            <h2>{pesquisa.titulo}</h2>
            <p><strong>Descrição:</strong> {pesquisa.descricao}</p>
            
            <h3>Estatísticas por Pergunta:</h3>
            {estatisticasPorPergunta.map(estatistica => (
              <div key={estatistica.perguntaId} className="pergunta-estatistica">
                <h4>{estatistica.descricao}</h4>
                <p><strong>Alternativa mais escolhida:</strong> {estatistica.alternativaMaisEscolhida.texto} ({estatistica.alternativaMaisEscolhida.contagem} vezes)</p>
                <h5>Contagem de todas as alternativas:</h5>
                <ul>
                  {estatistica.contagemAlternativas.map(alt => (
                    <li key={alt.id}>{alt.texto}: {alt.contagem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Relatorios;
