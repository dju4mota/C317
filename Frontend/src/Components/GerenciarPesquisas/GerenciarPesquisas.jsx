import { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill, BsPlusCircle } from "react-icons/bs";
import Modal from './Modal';
import "./GerenciarPesquisas.css";

const API_URL = "http://localhost:8080/api/v1/pesquisas";

const GerenciarPesquisas = () => {
  const [pesquisas, setPesquisas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [pesquisaAtual, setPesquisaAtual] = useState(null);

  useEffect(() => {
    fetchPesquisas();
  }, []);

  const fetchPesquisas = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Falha ao buscar pesquisas');
      }
      const data = await response.json();
      setPesquisas(data);
    } catch (error) {
      console.error('Erro ao buscar pesquisas:', error);
    }
  };

  const abrirModal = (pesquisa = null) => {
    setPesquisaAtual(pesquisa || { titulo: '', descricao: '', perguntas: [] });
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPesquisaAtual(null);
  };

  const salvarPesquisa = async (idPesquisaCriada) => {
    try {
      await fetchPesquisas(); // Atualiza a lista de pesquisas
      fecharModal();
    } catch (error) {
      console.error('Erro ao salvar pesquisa:', error);
    }
  };

  const excluirPesquisa = async (id) => {
    try {
      const perguntas = pesquisas.find(p => p.id === id)?.perguntas || [];
      // Deletar cada pergunta da pesquisa antes de deletar a pesquisa
      for (const pergunta of perguntas) {
        await fetch(`${API_URL}/pergunta/${pergunta.id_pergunta}`, { method: 'DELETE' });
      }

      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Falha ao excluir pesquisa');
      }

      await fetchPesquisas();
    } catch (error) {
      console.error('Erro ao excluir pesquisa:', error);
    }
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