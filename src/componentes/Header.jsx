import './Header.css'

function Header({ quantidade, carrinho, total, limparCarrinho }) {

    return(
        <div className="titulo">

            <div className="logo-container">

                <h1 className="logo-titulo">
                    ✦ XPRESS FOOD ✦
                </h1>

                <p className="logo-subtitulo">
                    ❖ Pediu? Chegou!
                </p>

            </div>


            <div className="carrinho">

                <h3>
                    🛒 Carrinho ({quantidade})
                </h3>


                {
                    carrinho.length === 0 ?

                    <p>
                        Carrinho vazio
                    </p>

                    :

                    <ul>

                        {
                            carrinho.map((item,index)=>(

                                <li key={index}>

                                    <div className="item-carrinho">

                                        <strong>
                                            {item.nome}
                                        </strong>

                                        <span>
                                            {item.quantidade}x
                                        </span>

                                    </div>

                                    <div className="preco-item">

                                        R$ {(item.preco * item.quantidade)
                                        .toFixed(2)
                                        .replace('.', ',')}

                                    </div>

                                </li>

                            ))
                        }

                    </ul>
                }


                {
                    carrinho.length > 0 &&

                    <div className="total-carrinho">

                        Total:
                        <strong>
                            R$ {total.toFixed(2).replace('.', ',')}
                        </strong>

                    </div>
                }


                <button onClick={limparCarrinho}>
                    Limpar Carrinho
                </button>

            </div>

        </div>
    )
}


export default Header