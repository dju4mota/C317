import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';

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
        perguntas: pesquisa.perguntas || []
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePerguntaChange = (index, value) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[index].pergunta = value;
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const handleAlternativaChange = (perguntaIndex, alternativaIndex, value) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas[alternativaIndex] = value;
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const adicionarAlternativa = (perguntaIndex) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas.push('');
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const adicionarPergunta = () => {
    setFormData({
      ...formData,
      perguntas: [...formData.perguntas, { pergunta: '', alternativas: [''], correta: null }]
    });
  };

  const removerPergunta = (perguntaIndex) => {
    const novasPerguntas = formData.perguntas.filter((_, index) => index !== perguntaIndex);
    setFormData({ ...formData, perguntas: novasPerguntas });
  };

  const removerAlternativa = (perguntaIndex, alternativaIndex) => {
    const novasPerguntas = [...formData.perguntas];
    novasPerguntas[perguntaIndex].alternativas = novasPerguntas[perguntaIndex].alternativas.filter((_, index) => index !== alternativaIndex);
    if (novasPerguntas[perguntaIndex].correta === alternativaIndex) {
      novasPerguntas[perguntaIndex].correta = null;
    } else if (novasPerguntas[perguntaIndex].correta > alternativaIndex) {
      novasPerguntas[perguntaIndex].correta--;
    }
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
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Perguntas:</label>
            {formData.perguntas.map((pergunta, perguntaIndex) => (
              <div key={perguntaIndex} className="pergunta-container">
                <div className="pergunta-header">
                  <input
                    type="text"
                    value={pergunta.pergunta}
                    onChange={(e) => handlePerguntaChange(perguntaIndex, e.target.value)}
                    placeholder="Digite a pergunta"
                    className="pergunta-input"
                  />
                  <button
                    type="button"
                    onClick={() => removerPergunta(perguntaIndex)}
                    className="btn-remover"
                  >
                    <BsX />
                  </button>
                </div>
                {pergunta.alternativas.map((alt, altIndex) => (
                  <div key={altIndex} className="alternativa-container">
                    <input
                      type="text"
                      value={alt}
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
    id_criador: PropTypes.number,
    descricao: PropTypes.string,
    perguntas: PropTypes.arrayOf(PropTypes.shape({
      pergunta: PropTypes.string,
      alternativas: PropTypes.arrayOf(PropTypes.string),
      correta: PropTypes.number
    }))
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Modal;