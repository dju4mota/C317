import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import "./Modal.css";

const Modal = ({ pesquisa, onClose, onSave }) => {
  const [respostas, setRespostas] = useState(
    pesquisa.perguntas.reduce((acc, pergunta) => {
      acc[pergunta.id] = pergunta.alternativaEscolhida;
      return acc;
    }, {})
  );

  const handleRespostaChange = useCallback((perguntaId, alternativaId) => {
    if (!pesquisa.finalizada) {
      setRespostas(prevRespostas => ({
        ...prevRespostas,
        [perguntaId]: alternativaId
      }));
    }
  }, [pesquisa.finalizada]);

  const handleFinalizar = async () => {
    const pesquisaAtualizada = {
      ...pesquisa,
      finalizada: true,
      perguntas: pesquisa.perguntas.map(pergunta => ({
        ...pergunta,
        alternativaEscolhida: respostas[pergunta.id]
      }))
    };
    await onSave(pesquisaAtualizada);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{pesquisa.titulo}</h2>
        <p>{pesquisa.descricao}</p>

        <div>
          <h3>Perguntas:</h3>
          {pesquisa.perguntas.map((pergunta) => (
            <div key={pergunta.id} className="pergunta-container">
              <p><strong>{pergunta.descricao}</strong></p>
              <div className="alternativas-container">
                {pergunta.alternativas.map((alternativa) => (
                  <label key={alternativa.id} className="alternativa-label">
                    <input
                      type="radio"
                      name={`pergunta-${pesquisa.id}-${pergunta.id}`}
                      value={alternativa.id}
                      checked={respostas[pergunta.id] === alternativa.id}
                      onChange={() => handleRespostaChange(pergunta.id, alternativa.id)}
                      disabled={pesquisa.finalizada}
                    />
                    {alternativa.texto}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          {!pesquisa.finalizada && (
            <button onClick={handleFinalizar} className="finalizar-btn">
              Enviar Respostas
            </button>
          )}
          <button onClick={onClose} className="fechar-btn">
            {pesquisa.finalizada ? "Fechar" : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  pesquisa: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    finalizada: PropTypes.bool.isRequired,
    perguntas: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
      alternativaEscolhida: PropTypes.number,
      alternativas: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        texto: PropTypes.string.isRequired
      })).isRequired
    })).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Modal;