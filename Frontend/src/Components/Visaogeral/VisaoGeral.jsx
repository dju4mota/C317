import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import "./VisaoGeral.css"

// Registrar os componentes e o plugin no ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Exemplo de dados dinâmicos com base no número de pesquisas por estado
const pesquisasPorEstado = {
  naoRespondida: 5,
  emProgresso: 3,
  respondida: 7,
};

const data = {
  labels: ['Não Respondida', 'Em Progresso', 'Respondida'],
  datasets: [
    {
      label: 'Estado das Pesquisas',
      data: [
        pesquisasPorEstado.naoRespondida, 
        pesquisasPorEstado.emProgresso, 
        pesquisasPorEstado.respondida
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.4)',   // Cor para 'Não Respondida'
        'rgba(54, 162, 235, 0.4)',   // Cor para 'Em Progresso'
        'rgba(75, 192, 192, 0.4)',   // Cor para 'Respondida'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
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
          size: 24, // Aumenta o tamanho da fonte das labels da legenda
          weight: 500
        },
      },
    },
    tooltip: {
      enabled: true,
    },
    datalabels: {
      // Configurações para os rótulos de dados
      color: '#000',           // Cor do texto
      font: {
        size: 24,              // Tamanho da fonte das labels no gráfico
        weight: 'bold',        // Negrito
      },
      formatter: (value) => {
        return value;
      },
    },
  },
};


const VisaoGeral = () => {
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
          <p>Você não possui nenhum aviso</p>
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;