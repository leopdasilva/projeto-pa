import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Layout.css";

function Layout({ quantidadeCarrinho }) {
    const navigate = useNavigate();

    return (
        <>
            <Header
                quantidade={quantidadeCarrinho}
                mostrarCardapio={() => navigate("/home")}
                mostrarCarrinho={() => navigate("/carrinho")}
            />
            <div className="page-shell">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;