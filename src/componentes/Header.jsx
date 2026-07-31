import './Header.css'

import logoLanchonete from '../../public/imagens/xpress-logo2.png'
import subtitulo from '../../public/imagens/subtitulo.png'


function Header({ quantidade, carrinho, limparCarrinho })  {

    return(
        <>
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
                            <p>Carrinho vazio</p>
                        :
                        <ul>
                            {
                                carrinho.map((item,index)=>
                                    <li key={index}>
                                        <span>{item.nome}</span>
                                        <strong>x{item.quantidade}</strong>
                                    </li>
                                )
                            }
                        </ul>
                    }

                    <button onClick={limparCarrinho}>
                        Limpar Carrinho
                    </button>
                </div>
            </div>
        </>
    )
}


export default Header