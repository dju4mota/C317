import "./Usuarios.css"

const Usuarios = () => {
  return (
    <div className="usuario-container">
      <h2>Criar novo usuário</h2>
      <form>
        <div className="email">
          <label>E-mail:</label>
          <input type="text" name="email"/>
        </div>
        <div className="senha">
          <label>Senha:</label>
          <input type="text" name="senha"/>
        </div>
        <div className="selecao">
          <label htmlFor="tipo">Selecione o tipo de usuário:</label>
          <select name="tipo" id="tipo">
            <option value="colaborador" selected>Colaborador</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Usuarios