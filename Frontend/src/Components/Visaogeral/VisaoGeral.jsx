import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./VisaoGeral.css"
import { useOutletContext } from 'react-router-dom';

// Registrar os componentes e o plugin no ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const API_PESQUISAS_URL = 'http://localhost:8080/api/v1/pesquisas';
const API_RESULTADOS_URL = 'http://localhost:8080/api/v1/resultados';

const VisaoGeral = () => {
  const [pesquisasPorEstado, setPesquisasPorEstado] = useState({
    naoRespondida: 0,
    respondida: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useOutletContext();

  useEffect(() => {
    const fetchDados = async () => {
      setIsLoading(true);
      try {
        const [pesquisasResponse, resultadosResponse] = await Promise.all([
          fetch(API_PESQUISAS_URL),
          fetch(`${API_RESULTADOS_URL}?idUsuario=${userId}`)
        ]);

        if (!pesquisasResponse.ok || !resultadosResponse.ok) {
          throw new Error('Falha ao buscar dados');
        }

        const [pesquisas, resultados] = await Promise.all([
          pesquisasResponse.json(),
          resultadosResponse.json()
        ]);

        // Verificar quais pesquisas foram respondidas pelo usuário
        const pesquisasRespondidasIds = new Set(resultados.map(r => r.idPesquisa));
        const estados = pesquisas.reduce((acc, pesquisa) => {
          if (pesquisasRespondidasIds.has(pesquisa.id)) {
            acc.respondida += 1;
          } else {
            acc.naoRespondida += 1;
          }
          return acc;
        }, { naoRespondida: 0, respondida: 0 });

        setPesquisasPorEstado(estados);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDados();
  }, []);

  const data = {
    labels: ['Não Respondida', 'Respondida'],
    datasets: [
      {
        label: 'Estado das Pesquisas',
        data: [
          pesquisasPorEstado.naoRespondida, 
          pesquisasPorEstado.respondida
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',   // Cor para 'Não Respondida'
          'rgba(75, 192, 192, 0.4)',   // Cor para 'Respondida'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#000',
          font: {
            size: 24,
            weight: 500
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: '#000',
        font: {
          size: 24,
          weight: 'bold',
        },
        formatter: (value) => {
          return value;
        },
      },
    },
  };

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  return (
    <div className="visao-geral-container">
      <h1>Visão Geral</h1>
      <div className="content-container">
        <div className='grafico-container'>
          <h2>Estado das Pesquisas</h2>
          <Pie data={data} options={options} />
        </div>
        <div className="avisos">
          <h2>Avisos</h2>
          {pesquisasPorEstado.naoRespondida > 0 ? (
            <p>Você tem {pesquisasPorEstado.naoRespondida} pesquisa(s) não respondida(s).</p>
          ) : (
            <p>Você não possui nenhum aviso.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;
