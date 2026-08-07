import { useNavigate } from "react-router-dom";
import "./Carrinho.css";

function Carrinho({
    carrinho,
    total,
    limparCarrinho,
    finalizarCompra,
    removerItem,
    aumentarQuantidade,
    diminuirQuantidade
}) {
    const totalItens = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    return (
        <div className="carrinho-container">

            <h2 className="titulo-carrinho">
                🛒 Meu Carrinho
            </h2>

            {
                carrinho.length === 0 ?

                <div className="carrinho-vazio">
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione alguns produtos para continuar.</p>
                </div>

                :
                <>
                    <div className="lista-carrinho">
                        {
                            carrinho.map((item,index)=>(
                                <div className="item-carrinho" key={index}>

                                    <img
                                        src={item.imagem}
                                        alt={item.nome}
                                        className="imagem-item"
                                    />

                                    <div className="info-item">
                                        <h3>{item.nome}</h3>

                                        <p className="categoria">
                                            {item.categoria}
                                        </p>

                                        <div className="controle-quantidade">

                                            <button
                                                className="btn-qtd"
                                                disabled={item.quantidade === 1}
                                                onClick={() => diminuirQuantidade(item.nome)}
                                            >
                                                    −
                                            </button>

                                            <span className="numero-qtd">
                                                {item.quantidade}
                                            </span>

                                            <button
                                                className="btn-qtd"
                                                onClick={() => aumentarQuantidade(item.nome)}
                                            >
                                                +
                                            </button>

                                        </div>

                                        <p>
                                            Preço Unitário:
                                            <strong>
                                                {" "}R$ {item.preco.toFixed(2).replace(".",",")}
                                            </strong>
                                        </p>

                                        <p className="subtotal">
                                            Subtotal:
                                            <strong>
                                                {" "}R$ {(item.preco*item.quantidade).toFixed(2).replace(".",",")}
                                            </strong>
                                        </p>

                                        <div className="acoes-item">
                                            <button
                                                className="btn-remover"
                                                onClick={() => {
                                                    if (window.confirm(`Deseja remover ${item.nome} do carrinho?`)) {
                                                        removerItem(item.nome);
                                                    }
                                                }}
                                            >
                                                🗑
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="rodape-carrinho">
                        <div className="resumo-carrinho">
                            <h3>
                                Total de Itens: <span>{totalItens}</span>
                            </h3>

                            <h2>
                                Total: <span>R$ {total.toFixed(2).replace(".",",")}</span>
                            </h2>

                        </div>

                        <div className="botoes-carrinho">
                            <button
                                className="btn-limpar"
                                onClick={limparCarrinho}
                            >
                                Limpar Carrinho
                            </button>

                            <button
                                className="btn-finalizar"
                                onClick={finalizarCompra}
                            >
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Carrinho;