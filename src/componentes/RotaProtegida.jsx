import { Navigate, Outlet } from "react-router-dom";

function RotaProtegida({ tipo }) {
  const usuario = localStorage.getItem("xpresso_usuario");

  // Não está logado
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // Usuário tentando entrar na área errada
  if (tipo && usuario !== tipo) {
    if (usuario === "cliente") {
      return <Navigate to="/home" replace />;
    }

    if (usuario === "chef") {
      return <Navigate to="/cozinha" replace />;
    }

    // Usuário inválido
    localStorage.removeItem("xpresso_usuario");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default RotaProtegida;