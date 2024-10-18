import  { useState } from 'react';

function Configuracoes() {
  const [configuracoes, setConfiguracoes] = useState({
    receberNotificacoes: true,
    temaEscuro: false,
    idioma: 'pt-BR',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfiguracoes({
      ...configuracoes,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria as configurações atualizadas para a API
    console.log('Configurações salvas:', configuracoes);
  };

  return (
    <div className="configuracoes">
      <h1>Configurações</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="checkbox"
              name="receberNotificacoes"
              checked={configuracoes.receberNotificacoes}
              onChange={handleChange}
            />
            Receber notificações
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="temaEscuro"
              checked={configuracoes.temaEscuro}
              onChange={handleChange}
            />
            Tema escuro
          </label>
        </div>
        <div>
          <label>
            Idioma:
            <select name="idioma" value={configuracoes.idioma} onChange={handleChange}>
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
              <option value="es-ES">Español</option>
            </select>
          </label>
        </div>
        <button type="submit">Salvar Configurações</button>
      </form>
    </div>
  );
}

export default Configuracoes;