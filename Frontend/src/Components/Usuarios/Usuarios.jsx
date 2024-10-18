import { useState, useEffect } from 'react';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', tipo: 'funcionario' });

  useEffect(() => {
    // Aqui você faria uma chamada à API para buscar os usuários
    // Por enquanto, vamos usar dados mockados
    setUsuarios([
      { id: 1, nome: 'João Silva', email: 'joao@exemplo.com', tipo: 'admin' },
      { id: 2, nome: 'Maria Santos', email: 'maria@exemplo.com', tipo: 'funcionario' },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você enviaria os dados do novo usuário para a API
    console.log('Novo usuário:', novoUsuario);
    // Resetar o formulário
    setNovoUsuario({ nome: '', email: '', tipo: 'funcionario' });
  };

  return (
    <div className="usuarios">
      <h1>Gerenciar Usuários</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={novoUsuario.nome}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={novoUsuario.email}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
          placeholder="Email"
          required
        />
        <select
          value={novoUsuario.tipo}
          onChange={(e) => setNovoUsuario({ ...novoUsuario, tipo: e.target.value })}
        >
          <option value="funcionario">Funcionário</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Adicionar Usuário</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.tipo}</td>
              <td>
                <button>Editar</button>
                <button>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Usuarios;