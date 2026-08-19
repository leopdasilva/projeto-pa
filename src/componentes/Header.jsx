import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header({ quantidade }) {
    const navigate = useNavigate();

    const usuario = localStorage.getItem("xpresso_usuario");

    console.log("USUÁRIO:", usuario);

    function logout() {
        localStorage.removeItem("xpresso_usuario");
        navigate("/");
      }

    return (
        <header className="titulo">
            <div className="logo-container">
                <h1 className="logo-titulo">
                    ✦ XPRESS FOOD ✦
                </h1>

                <p className="logo-subtitulo">
                    ❖ Pediu? Chegou!
                </p>

            </div>

            <nav className="menu-header">
                <p className="saudacao">
                    Olá, <span className="nome-usuario">{usuario || "usuário"}</span>!
                </p>

                <button
                    className="btn-header"
                    onClick={() => navigate("/home")}
                >
                    🍔 Cardápio
                </button>

                <button
                    className="btn-header btn-carrinho"
                    onClick={() => navigate("/carrinho")}
                >
                    🛒 Carrinho ({quantidade})
                </button>

                <button
                    className="btn-header btn-logout"
                    onClick={logout}
                >
                    ↪ Logout
                </button>
            </nav>
        </header>
    );
}

export default Header;