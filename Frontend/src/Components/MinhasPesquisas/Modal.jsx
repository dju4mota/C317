import { useCallback } from 'react';
import PropTypes from 'prop-types';
import "./Modal.css";

const Modal = ({ pesquisa, onClose, respostas, onRespostasChange, finalizada, onFinalizar }) => {
  const handleRespostaChange = useCallback((perguntaIndex, resposta) => {
    if (!finalizada) {
      onRespostasChange(pesquisa.id, {
        ...respostas,
        [perguntaIndex]: resposta
      });
    }
  }, [pesquisa.id, respostas, onRespostasChange, finalizada]);

  const handleFinalizar = () => {
    onFinalizar(pesquisa.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{pesquisa.titulo}</h2>
        <p>{pesquisa.descricao}</p>

        <div>
          <h3>Perguntas:</h3>
          {pesquisa.perguntas.map((pergunta, perguntaIndex) => (
            <div key={perguntaIndex} className="pergunta-container">
              <p><strong>{pergunta.pergunta}</strong></p>
              <div className="alternativas-container">
                {pergunta.alternativas.map((alternativa, altIndex) => (
                  <label key={altIndex} className="alternativa-label">
                    <input
                      type="radio"
                      name={`pergunta-${pesquisa.id}-${perguntaIndex}`}
                      value={alternativa}
                      checked={respostas[perguntaIndex] === alternativa}
                      onChange={() => handleRespostaChange(perguntaIndex, alternativa)}
                      disabled={finalizada}
                    />
                    {alternativa}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          {!finalizada && (
            <button onClick={handleFinalizar} className="finalizar-btn">
              Enviar Respostas
            </button>
          )}
          <button onClick={onClose} className="fechar-btn">
            {finalizada ? "Fechar" : "Cancelar"}
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
    perguntas: PropTypes.arrayOf(PropTypes.shape({
      pergunta: PropTypes.string.isRequired,
      alternativas: PropTypes.arrayOf(PropTypes.string).isRequired
    })).isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  respostas: PropTypes.object.isRequired,
  onRespostasChange: PropTypes.func.isRequired,
  finalizada: PropTypes.bool.isRequired,
  onFinalizar: PropTypes.func.isRequired
};

export default Modal;