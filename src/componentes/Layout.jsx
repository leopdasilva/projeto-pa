import { useNavigate } from "react-router-dom";

import Header from "./Header";
import "./Layout.css";

function Layout({ quantidadeCarrinho, children }) {
  const navigate = useNavigate();

  return (
    <>
      <Header
        quantidade={quantidadeCarrinho}
        mostrarCardapio={() => navigate("/home")}
        mostrarCarrinho={() => navigate("/carrinho")}
      />

      <div className="page-shell">
        {children}
      </div>
    </>
  );
}

export default Layout;