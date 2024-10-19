import { useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill, BsPlusCircle } from "react-icons/bs";
import Modal from './Modal';
import "./GerenciarPesquisas.css";

const GerenciarPesquisas = () => {
  const [pesquisas, setPesquisas] = useState([
    { id: 4, titulo: "Satisfação do Cliente", descricao: "Avaliação da satisfação dos clientes com nossos serviços", perguntas: [{ pergunta: "Como você avalia nosso atendimento?", alternativas: ["Excelente", "Bom", "Regular", "Ruim"] },{ pergunta: "O que você achou da qualidade do produto?", alternativas: ["Muito boa", "Boa", "Regular", "Ruim"] }] },
    { id: 5, titulo: "Feedback do Produto", descricao: "Coleta de opiniões sobre nosso novo produto", perguntas: [{ pergunta: "O que você achou da qualidade do produto?", alternativas: ["Muito boa", "Boa", "Regular", "Ruim"] }] },
    { id: 6, titulo: "Pesquisa de Mercado", descricao: "Análise das tendências de mercado em nossa área", perguntas: [{ pergunta: "Qual característica você mais valoriza em um produto?", alternativas: ["Preço", "Qualidade", "Inovação", "Sustentabilidade"] }] },
  ]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaAtual, setPesquisaAtual] = useState(null);

  const abrirModal = (pesquisa = null) => {
    if (pesquisa) {
      setPesquisaAtual(pesquisa); // Verifica se a pesquisa é válida
    } else {
      setPesquisaAtual({ titulo: '', descricao: '', perguntas: [] });
    }
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPesquisaAtual(null);
  };

  const salvarPesquisa = (pesquisa) => {
    if (pesquisa.id) {
      setPesquisas(pesquisas.map(p => p.id === pesquisa.id ? pesquisa : p));
    } else {
      setPesquisas([...pesquisas, { ...pesquisa, id: Date.now() }]);
    }
    fecharModal();
  };

  const excluirPesquisa = (id) => {
    setPesquisas(pesquisas.filter(p => p.id !== id));
  };

  return (
    <div className="gerenciar-pesquisas">
      <h1>Gerenciar Pesquisas</h1>
      <button className="btn-adicionar" onClick={() => abrirModal()}>
        <BsPlusCircle /> Adicionar Pesquisa
      </button>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pesquisas.map((pesquisa) => (
              <tr key={pesquisa.id}>
                <td>{pesquisa.titulo}</td>
                <td>{pesquisa.descricao}</td>
                <td>
                  <span className="actions">
                    <BsFillPencilFill className="edit" onClick={() => abrirModal(pesquisa)} />
                    <BsFillTrashFill className="delete" onClick={() => excluirPesquisa(pesquisa.id)} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalAberto && (
        <Modal
          pesquisa={pesquisaAtual}
          onClose={fecharModal}
          onSave={salvarPesquisa}
        />
      )}
    </div>
  );
};

export default GerenciarPesquisas;