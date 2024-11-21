import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Modal.css";

const API_URL = "http://localhost:8080/api/v1";

export default function Modal({ pesquisa, onClose, userId, onPesquisaRespondida }) {
  const { id: idPesquisa, perguntas, respostasDoUsuario, finalizada } = pesquisa;
  const [respostas, setRespostas] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [respostaEnviada, setRespostaEnviada] = useState(false);

  useEffect(() => {
    const respostasIniciais = {};
    perguntas.forEach((pergunta) => {
      const respostaExistente = respostasDoUsuario.find(
        (r) => r.id_pergunta === pergunta.id_pergunta
      );
      if (respostaExistente) {
        respostasIniciais[pergunta.id_pergunta] = respostaExistente.alternativaEscolhida;
      }
    });
    setRespostas(respostasIniciais);
  }, [perguntas, respostasDoUsuario]);

  const handleRespostaChange = (idPergunta, alternativa) => {
    setRespostas((prev) => ({ ...prev, [idPergunta]: alternativa }));
  };

  const todasPerguntasRespondidas = () => {
    return perguntas.every((pergunta) => respostas[pergunta.id_pergunta]);
  };

  const enviarRespostas = async () => {
    if (enviando || finalizada) return; // Não envia se já estiver finalizada
    setEnviando(true);

    try {
      const verificacaoResponse = await fetch(
        `${API_URL}/resultados?idPesquisa=${idPesquisa}&idUsuario=${userId}`
      );
      if (!verificacaoResponse.ok) return;

      const resultadosExistentes = await verificacaoResponse.json();
      if (
        resultadosExistentes.some(
          (resultado) =>
            resultado.idPesquisa === idPesquisa && resultado.idUsuario === parseInt(userId)
        )
      ) {
        setEnviando(false);
        return;
      }

      const resultadoResponse = await fetch(`${API_URL}/resultados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idPesquisa,
          idUsuario: parseInt(userId),
          finalizada: true, // Garantindo que finalizada seja true
        }),
      });

      if (!resultadoResponse.ok) return;

      const resultadosAtualizados = await fetch(`${API_URL}/resultados`).then((res) =>
        res.json()
      );
      const novoResultado = resultadosAtualizados.find(
        (r) => r.idPesquisa === idPesquisa && r.idUsuario === parseInt(userId)
      );
      if (!novoResultado) return;

      for (const [idPergunta, alternativaEscolhida] of Object.entries(respostas)) {
        const respostaResponse = await fetch(
          `${API_URL}/resultados/${novoResultado.id}/resposta`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              alternativaEscolhida,
              id_pergunta: parseInt(idPergunta),
            }),
          }
        );

        if (!respostaResponse.ok) return;
      }

      setRespostaEnviada(true);
      onPesquisaRespondida(idPesquisa);
    } finally {
      setEnviando(false);
    }
  };

  const fecharEAtualizar = () => {
    onClose();
    window.location.reload();
  };

  console.log("Finalizada:", finalizada); // Para depuração

  if (respostaEnviada) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Pesquisa Respondida</h2>
          <p>Suas respostas foram enviadas com sucesso. Obrigado por participar!</p>
          <button onClick={fecharEAtualizar} className="fechar-btn">
            Fechar e Atualizar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{pesquisa.titulo}</h2>
        <p>{pesquisa.descricao}</p>
        {perguntas.map((pergunta) => (
          <div key={pergunta.id_pergunta} className="pergunta-container">
            <h2>{pergunta.titulo}</h2>
            <p>{pergunta.descricao}</p>
            <div className="alternativas-container">
              {pergunta.alternativas.map((alternativa) => (
                <label key={alternativa} className="alternativa-label">
                  <input
                    type="radio"
                    name={`pergunta-${pergunta.id_pergunta}`}
                    value={alternativa}
                    checked={respostas[pergunta.id_pergunta] === alternativa}
                    onChange={() => handleRespostaChange(pergunta.id_pergunta, alternativa)}
                    disabled={finalizada} // Alternativas desabilitadas se a pesquisa estiver finalizada
                  />
                  {alternativa}
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="modal-footer">
          {finalizada ? (
            <p className="finalizada-msg">
              Esta pesquisa já foi finalizada. Você não pode alterar as respostas.
            </p>
          ) : (
            <button
              onClick={enviarRespostas}
              disabled={!todasPerguntasRespondidas() || enviando}
              className="enviar-btn"
            >
              {enviando ? "Enviando..." : "Enviar Respostas"}
            </button>
          )}
          <button onClick={onClose} className="fechar-btn">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// Definindo a validação das props
Modal.propTypes = {
  pesquisa: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    perguntas: PropTypes.arrayOf(
      PropTypes.shape({
        id_pergunta: PropTypes.number.isRequired,
        titulo: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        alternativas: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ).isRequired,
    respostasDoUsuario: PropTypes.arrayOf(
      PropTypes.shape({
        id_pergunta: PropTypes.number.isRequired,
        alternativaEscolhida: PropTypes.string.isRequired,
      })
    ),
    finalizada: PropTypes.bool.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  onPesquisaRespondida: PropTypes.func.isRequired,
};
