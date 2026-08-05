import './Header.css'

function Header({ quantidade, mostrarCardapio, mostrarCarrinho }) {

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

                <button
                    className="btn-header"
                    onClick={mostrarCardapio}
                >
                    🍔 Cardápio
                </button>

                <button
                    className="btn-header btn-carrinho"
                    onClick={mostrarCarrinho}
                >
                    🛒 Carrinho ({quantidade})
                </button>

            </nav>

        </header>
    )
}

export default Header