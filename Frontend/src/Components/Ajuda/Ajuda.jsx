function Ajuda() {
  const faqs = [
    {
      pergunta: 'Como visualizar os resultados de uma pesquisa?',
      resposta: 'Acesse a seção "Relatórios" e selecione a pesquisa desejada para ver os resultados e análises.',
    },
    {
      pergunta: 'Como adicionar um novo usuário?',
      resposta: 'Na seção "Usuários", preencha o formulário com as informações do novo usuário e clique em "Adicionar Usuário".',
    },
  ];

  return (
    <div className="ajuda">
      <h1>Ajuda</h1>
      <h2>Perguntas Frequentes</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>
            <h3>{faq.pergunta}</h3>
            <p>{faq.resposta}</p>
          </li>
        ))}
      </ul>
      <h2>Suporte</h2>
      <p>
        Se você não encontrou a resposta para sua pergunta, entre em contato com nossa equipe de suporte:
        <br />
        Email: suportecaptalis@exemplo.com
        <br />
        Telefone: 32214-412421
      </p>
    </div>
  );
}

export default Ajuda;