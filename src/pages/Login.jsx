import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  // Campos do formulário de acesso do cliente ou da cozinha.
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar() {
    if (usuario === "cliente" && senha === "123") {
      navigate("/home");
      return;
    }

    if (usuario === "cozinha" && senha === "123") {
      navigate("/cozinha");
      return;
    }

    alert("Usuário ou senha incorretos");
  }

  return (
    <div className="login-page">
      <div className="login">
        <div className="login-logo">
          <h1>✦ XPRESS FOOD ✦</h1>
          <p>❖ Pediu? Chegou!</p>
        </div>

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Usuário"
          value={usuario}
          onChange={(event) => setUsuario(event.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />

        <button onClick={entrar}>Entrar</button>

        <a href="#">Esqueceu a senha?</a>

        <div className="usuarios-teste">
          <p>Cliente: cliente / 123</p>
          <p>Cozinha: cozinha / 123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;