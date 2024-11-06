import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';

const API_URL = "http://localhost:8080/api/v1/pesquisas";

const Modal = ({ pesquisa, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: pesquisa?.id || null,
    titulo: pesquisa?.titulo || '',
    descricao: pesquisa?.descricao || '',
    perguntas: pesquisa?.perguntas || []
  });

  useEffect(() => {
    if (pesquisa) {
      setFormData({
        id: pesquisa.id,
        titulo: pesquisa.titulo,
        descricao: pesquisa.descricao,
        perguntas: pesquisa.perguntas.map(pergunta => ({
          ...pergunta,
          alternativas: pergunta.alternativas
            ? pergunta.alternativas.map(alt => (typeof alt === 'string' ? { texto: alt } : alt))
            : []
        }))
      });
    }
  }, [pesquisa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const pesquisaId = formData.id;
      const method = pesquisaId ? 'PUT' : 'POST';
      const pesquisaBody = {
        id: pesquisaId || undefined,
        titulo: formData.titulo,
        descricao: formData.descricao,
        id_criador: 2
      };

      const respostaPesquisa = await fetch(API_URL, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pesquisaBody),
      });

      if (!respostaPesquisa.ok) {
        console.error('Erro ao salvar pesquisa:', respostaPesquisa.status, respostaPesquisa.statusText);
        throw new Error(`Falha ao salvar pesquisa: ${respostaPesquisa.status} ${respostaPesquisa.statusText}`);
      }

      const idPesquisa = pesquisaId || (await respostaPesquisa.json()).id;

      for (const pergunta of formData.perguntas) {
        const perguntaUrl = pergunta.id_pergunta
          ? `${API_URL}/pergunta`
          : `${API_URL}/${idPesquisa}/pergunta`;

        const perguntaMethod = pergunta.id_pergunta ? 'PUT' : 'POST';
        const perguntaBody = {
          id_pergunta: pergunta.id_pergunta || undefined,
          titulo: pergunta.titulo,
          descricao: pergunta.descricao,
          alternativas: pergunta.alternativas.map(alt => alt.texto || alt)
        };

        const perguntaResponse = await fetch(perguntaUrl, {
          method: perguntaMethod,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(perguntaBody),
        });

        if (!perguntaResponse.ok) {
          console.error('Erro ao salvar pergunta:', perguntaResponse.status, perguntaResponse.statusText);
          throw new Error(`Falha ao salvar pergunta: ${perguntaResponse.status} ${perguntaResponse.statusText}`);
        }
      }

      onSave(idPesquisa);
      onClose();
    } catch (erro) {
      console.error('Erro ao salvar pesquisa ou perguntas:', erro);
      alert(`Erro ao salvar: ${erro.message}`);
    }
  };

  const handlePerguntaChange = (index, field, value) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[index][field] = value;
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const handleAlternativaChange = (perguntaIndex, alternativaIndex, value) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas[alternativaIndex] = { texto: value };
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const adicionarPergunta = () => {
    const novaPergunta = {
      id_pergunta: null,
      titulo: '',
      descricao: '',
      alternativas: []
    };
    setFormData({ ...formData, perguntas: [...formData.perguntas, novaPergunta] });
  };

  const adicionarAlternativa = (perguntaIndex) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas.push({ texto: '' });
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const removerPergunta = async (perguntaIndex) => {
    const pergunta = formData.perguntas[perguntaIndex];
    const novasPerguntas = formData.perguntas.filter((_, index) => index !== perguntaIndex);
    setFormData({ ...formData, perguntas: novasPerguntas });

    if (pergunta.id_pergunta) {
      try {
        const deleteUrl = `${API_URL}/pergunta/${pergunta.id_pergunta}`;
        const response = await fetch(deleteUrl, { method: 'DELETE' });
        
        if (!response.ok) {
          throw new Error(`Erro ao excluir a pergunta: ${response.statusText}`);
        }
      } catch (error) {
        console.error(error);
        alert(`Erro ao excluir pergunta: ${error.message}`);
      }
    }
  };

  const removerAlternativa = (perguntaIndex, alternativaIndex) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas = novasPerguntas[perguntaIndex].alternativas.filter((_, index) => index !== alternativaIndex);
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{pesquisa ? 'Editar Pesquisa' : 'Criar Nova Pesquisa'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao || ''}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Perguntas:</label>
            {formData.perguntas.map((pergunta, perguntaIndex) => (
              <div key={perguntaIndex} className="pergunta-container">
                <input
                  type="text"
                  value={pergunta.titulo || ''}
                  onChange={(e) => handlePerguntaChange(perguntaIndex, "titulo", e.target.value)}
                  placeholder="Título da Pergunta"
                  className="pergunta-input"
                />
                <textarea
                  value={pergunta.descricao || ''}
                  onChange={(e) => handlePerguntaChange(perguntaIndex, "descricao", e.target.value)}
                  placeholder="Descrição da Pergunta"
                  className="pergunta-descricao"
                ></textarea>
                <button
                  type="button"
                  onClick={() => removerPergunta(perguntaIndex)}
                  className="btn-remover-pergunta"
                >
                  <BsX />
                </button>
                {pergunta.alternativas.map((alt, altIndex) => (
                  <div key={altIndex} className="alternativa-container">
                    <input
                      type="text"
                      value={alt.texto || alt || ''}
                      onChange={(e) => handleAlternativaChange(perguntaIndex, altIndex, e.target.value)}
                      placeholder="Digite a alternativa"
                      className="alternativa-input"
                    />
                    <button
                      type="button"
                      onClick={() => removerAlternativa(perguntaIndex, altIndex)}
                      className="btn-remover-alternativa"
                    >
                      <BsX />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => adicionarAlternativa(perguntaIndex)}
                  className="btn-adicionar-alternativa"
                >
                  Adicionar Alternativa
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarPergunta}
              className="btn-adicionar-pergunta"
            >
              Adicionar Pergunta
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-salvar">Salvar</button>
            <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  pesquisa: PropTypes.shape({
    id: PropTypes.number,
    titulo: PropTypes.string,
    descricao: PropTypes.string,
    perguntas: PropTypes.arrayOf(PropTypes.shape({
      id_pergunta: PropTypes.number,
      titulo: PropTypes.string,
      descricao: PropTypes.string,
      alternativas: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.shape({ texto: PropTypes.string }),
          PropTypes.string
        ])
      ),
    })),
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;
