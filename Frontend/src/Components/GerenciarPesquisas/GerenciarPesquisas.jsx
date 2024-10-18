import { useState } from 'react';
import { BsFillTrashFill, BsFillPencilFill, BsPlusCircle } from "react-icons/bs";
import Modal from './Modal';
import "./GerenciarPesquisas.css";

const GerenciarPesquisas = () => {
  const [pesquisas, setPesquisas] = useState([
    { id: 1, titulo: "Pesquisa 1", descricao: "Descrição da Pesquisa 1" },
    { id: 2, titulo: "Pesquisa 2", descricao: "Descrição da Pesquisa 2" },
    { id: 3, titulo: "Pesquisa 3", descricao: "Descrição da Pesquisa 3" },
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