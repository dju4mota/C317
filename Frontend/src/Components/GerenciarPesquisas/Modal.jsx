import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';

const API_URL = "http://localhost:8080/api/v1/pesquisas";

const Modal = ({ pesquisa, isEditMode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: pesquisa?.id || null,
    titulo: pesquisa?.titulo || '',
    descricao: pesquisa?.descricao || '',
    perguntas: pesquisa?.perguntas?.map(pergunta => ({
      id_pergunta: pergunta.id_pergunta || null,
      titulo: pergunta.titulo || '',
      descricao: pergunta.descricao || '',
      alternativas: pergunta.alternativas.map(alt => (typeof alt === 'string' ? { texto: alt } : alt))
    })) || []
  });

  useEffect(() => {
    const carregarPerguntas = async () => {
      if (isEditMode && pesquisa?.id) {
        try {
          const response = await fetch(`${API_URL}/${pesquisa.id}/perguntas`);
          if (!response.ok) throw new Error('Erro ao carregar perguntas');
          const perguntas = await response.json();
          setFormData(prevData => ({
            ...prevData,
            perguntas: perguntas.map(pergunta => ({
              id_pergunta: pergunta.id_pergunta,
              titulo: pergunta.titulo,
              descricao: pergunta.descricao,
              alternativas: pergunta.alternativas.map(alt => ({ texto: alt }))
            }))
          }));
        } catch (error) {
          console.error('Erro ao carregar perguntas:', error);
        }
      }
    };
    carregarPerguntas();
  }, [isEditMode, pesquisa]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isEditMode == true){
      try {
        const method = isEditMode ? 'PUT' : 'POST';
        const pesquisaBody = {
          id: formData.id,
          titulo: formData.titulo,
          descricao: formData.descricao,
          id_criador: 2,
        };
  
        const respostaPesquisa = await fetch(API_URL, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(pesquisaBody),
        });
  
        if (!respostaPesquisa.ok) throw new Error('Erro ao salvar pesquisa');
  
        const idPesquisa = formData.id || (await respostaPesquisa.json()).id;
  
        for (const pergunta of formData.perguntas) {
          const perguntaUrl = pergunta.id_pergunta
            ? `${API_URL}/pergunta`
            : `${API_URL}/${idPesquisa}/pergunta`;
  
          const perguntaMethod = pergunta.id_pergunta ? 'PUT' : 'POST';
          const perguntaBody = {
            id_pergunta: pergunta.id_pergunta,
            titulo: pergunta.titulo,
            descricao: pergunta.descricao,
            alternativas: pergunta.alternativas.map(alt => alt.texto)
          };
  
          const respostaPergunta = await fetch(perguntaUrl, {
            method: perguntaMethod,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(perguntaBody),
          });
  
          if (!respostaPergunta.ok) throw new Error(`Erro ao salvar pergunta ID ${pergunta.id_pergunta || 'nova'}`);
        }
  
        onSave(idPesquisa);
        onClose();
      } catch (erro) {
        console.error('Erro ao salvar pesquisa ou perguntas:', erro);
        alert(`Erro ao salvar: ${erro.message}`);
      }
    }
    else{
      try {
        // 1. Criar ou atualizar a pesquisa
        const respostaPesquisa = await fetch(API_URL, {
          method: formData.id ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: formData.titulo,
            id_criador: 2, // Substitua pelo ID real do criador se necessário
            descricao: formData.descricao,
          }),
        });
    
        if (!respostaPesquisa.ok) {
          console.error('Resposta da API não foi bem-sucedida:', respostaPesquisa.status, respostaPesquisa.statusText);
          throw new Error(`Falha ao salvar pesquisa: ${respostaPesquisa.status} ${respostaPesquisa.statusText}`);
        }
        
        const textoResposta = await respostaPesquisa.text();
        console.log('Resposta da API:', textoResposta);
    
        // Tenta obter o ID da pesquisa criada
        let idPesquisa;
        if (textoResposta.includes('Pesquisa criada')) {
          // Se a resposta for "Pesquisa criada", fazemos uma chamada GET para obter os detalhes da pesquisa
          const respostaGet = await fetch(API_URL);
          const pesquisas = await respostaGet.json();
          const novaPesquisa = pesquisas[pesquisas.length - 1]; // Assume que a última pesquisa é a recém-criada
          idPesquisa = novaPesquisa.id;
        } else {
          try {
            const dadosPesquisa = JSON.parse(textoResposta);
            idPesquisa = dadosPesquisa.id;
          } catch (erroJSON) {
            console.error('Erro ao fazer parse do JSON:', erroJSON);
            throw new Error('Não foi possível obter o ID da pesquisa criada');
          }
        }
    
        if (!idPesquisa) {
          console.error('ID da pesquisa não encontrado na resposta');
          throw new Error('ID da pesquisa não encontrado');
        }
    
        console.log('ID da pesquisa obtido:', idPesquisa);
    
        // 2. Adicionar perguntas uma por uma
        for (const pergunta of formData.perguntas) {
          console.log('Adicionando pergunta:', pergunta);
          const respostaPergunta = await fetch(`${API_URL}/${idPesquisa}/pergunta`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              titulo: pergunta.titulo,
              descricao: pergunta.descricao,
              alternativas: pergunta.alternativas.map(alt => alt.texto)
            }),
          });          
    
          if (!respostaPergunta.ok) {
            console.error('Falha ao salvar pergunta:', respostaPergunta.status, respostaPergunta.statusText);
            throw new Error(`Falha ao salvar pergunta: ${respostaPergunta.status} ${respostaPergunta.statusText}`);
          }
    
          const respostaPerguntaTexto = await respostaPergunta.text();
          console.log('Resposta ao salvar pergunta:', respostaPerguntaTexto);
        }
    
        console.log('Todas as perguntas foram salvas com sucesso');
        onSave(); // Atualizar a lista de pesquisas
        onClose();
      } catch (erro) {
        console.error('Erro ao salvar pesquisa ou perguntas:', erro);
        alert(`Erro ao salvar: ${erro.message}`);
      }  
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
      id: formData.perguntas.length + 1,
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

  const removerPergunta = (perguntaIndex) => {
    const novasPerguntas = formData.perguntas.filter((_, index) => index !== perguntaIndex);
    setFormData({ ...formData, perguntas: novasPerguntas });
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
                <input
                  type="text"
                  value={pergunta.titulo}
                  onChange={(e) => handlePerguntaChange(perguntaIndex, "titulo", e.target.value)}
                  placeholder="Título da Pergunta"
                  className="pergunta-input"
                />
                <textarea
                  value={pergunta.descricao}
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
                      value={alt.texto}
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
    perguntas: PropTypes.arrayOf(
      PropTypes.shape({
        id_pergunta: PropTypes.number,
        titulo: PropTypes.string,
        descricao: PropTypes.string,
        alternativas: PropTypes.arrayOf(
          PropTypes.shape({
            texto: PropTypes.string
          })
        )
      })
    )
  }),
  isEditMode: PropTypes.bool.isRequired,  // Define isEditMode como booleano e obrigatório
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Modal;
