import { useState, useEffect } from 'react';

function Relatorios() {
  const [relatorios, setRelatorios] = useState([]);

  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar os relatórios
    // Por enquanto, vamos usar dados mockados
    setRelatorios([
      { id: 1, titulo: 'Relatório de Clima 2023', respostas: 150 },
      { id: 2, titulo: 'Relatório de Desempenho Q2', respostas: 75 },
    ]);
  }, []);

  return (
    <div className="relatorios">
      <h1>Relatórios</h1>
      <ul>
        {relatorios.map((relatorio) => (
          <li key={relatorio.id}>
            {relatorio.titulo} - Respostas: {relatorio.respostas}
            <button>Ver Detalhes</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Relatorios;