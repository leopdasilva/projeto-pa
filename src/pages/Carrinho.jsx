import { useState } from "react";
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
    const navigate = useNavigate();
    const [confirmarPedido, setConfirmarPedido] = useState(false);
    const [dadosEntrega, setDadosEntrega] = useState({
        endereco: "",
        numeroEndereco: "",
        formaPagamento: "Dinheiro"
    });

    const totalItens = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const subtotal = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    const taxaEntrega = subtotal > 0 ? 6.5 : 0;
    const totalComEntrega = subtotal + taxaEntrega;

    return (
        <div className="carrinho-container">
            <h2 className="titulo-carrinho">🛒 Meu Carrinho</h2>

            {carrinho.length === 0 ? (
                <div className="carrinho-vazio">
                    <h3>Seu carrinho está vazio</h3>
                    <p>Adicione alguns produtos para continuar.</p>
                </div>
            ) : (
                <>
                    <div className="lista-carrinho">
                        {carrinho.map((item, index) => (
                            <div className="item-carrinho" key={`${item.nome}-${index}`}>
                                <img
                                    src={item.imagem}
                                    alt={item.nome}
                                    className="imagem-item"
                                />

                                <div className="info-item">
                                    <h3>{item.nome}</h3>

                                    <p className="categoria">{item.categoria}</p>

                                    <div className="controle-quantidade">
                                        <button
                                            className="btn-qtd"
                                            disabled={item.quantidade === 1}
                                            onClick={() => diminuirQuantidade(item.nome)}
                                        >
                                            −
                                        </button>

                                        <span className="numero-qtd">{item.quantidade}</span>

                                        <button
                                            className="btn-qtd"
                                            onClick={() => aumentarQuantidade(item.nome)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p>
                                        Preço Unitário:
                                        <strong> R$ {item.preco.toFixed(2).replace(".",",")}</strong>
                                    </p>

                                    <p className="subtotal">
                                        Subtotal:
                                        <strong> R$ {(item.preco * item.quantidade).toFixed(2).replace(".",",")}</strong>
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
                        ))}
                    </div>

                    <div className="rodape-carrinho">
                        <div className="resumo-carrinho">
                            <div className="resumo-linha">
                                <span>Subtotal</span>
                                <strong>R$ {subtotal.toFixed(2).replace(".",",")}</strong>
                            </div>

                            <div className="resumo-linha">
                                <span>Entrega</span>
                                <strong>R$ {taxaEntrega.toFixed(2).replace(".",",")}</strong>
                            </div>

                            <div className="resumo-linha total">
                                <span>Total de Itens</span>
                                <strong>{totalItens}</strong>
                            </div>

                            <div className="resumo-linha total-final">
                                <span>Total</span>
                                <strong>R$ {totalComEntrega.toFixed(2).replace(".",",")}</strong>
                            </div>
                        </div>

                        <div className="botoes-carrinho">
                            <button className="btn-continuar" onClick={() => navigate("/home")}>
                                Continuar Comprando
                            </button>

                            <button className="btn-limpar" onClick={limparCarrinho}>
                                Limpar Carrinho
                            </button>

                            <button className="btn-finalizar" onClick={() => setConfirmarPedido(true)}>
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </>
            )}

            {confirmarPedido && (
                <div className="modal-confirmacao">
                    <div className="modal-box">
                        <h3>Confirmar pedido</h3>
                        <p>
                            Você está prestes a finalizar <strong>{totalItens}</strong> item(ns) no valor de
                            <strong> R$ {totalComEntrega.toFixed(2).replace(".",",")}</strong>.
                        </p>

                        <div className="form-entrega">
                            <label>
                                Rua
                                <input
                                    type="text"
                                    value={dadosEntrega.endereco}
                                    onChange={(event) =>
                                        setDadosEntrega(prev => ({ ...prev, endereco: event.target.value }))
                                    }
                                    placeholder="Ex.: Rua das Flores"
                                />
                            </label>

                            <label>
                                Número
                                <input
                                    type="text"
                                    value={dadosEntrega.numeroEndereco}
                                    onChange={(event) =>
                                        setDadosEntrega(prev => ({ ...prev, numeroEndereco: event.target.value }))
                                    }
                                    placeholder="Ex.: 245"
                                />
                            </label>

                            <label>
                                Forma de pagamento
                                <select
                                    value={dadosEntrega.formaPagamento}
                                    onChange={(event) =>
                                        setDadosEntrega(prev => ({ ...prev, formaPagamento: event.target.value }))
                                    }
                                >
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                                    <option value="Cartão de Débito">Cartão de Débito</option>
                                    <option value="PIX">PIX</option>
                                </select>
                            </label>
                        </div>

                        <div className="modal-resumo">
                            <span>Subtotal</span>
                            <strong>R$ {subtotal.toFixed(2).replace(".",",")}</strong>
                            <span>Entrega</span>
                            <strong>R$ {taxaEntrega.toFixed(2).replace(".",",")}</strong>
                        </div>

                        <div className="modal-acoes">
                            <button className="btn-cancelar" onClick={() => setConfirmarPedido(false)}>
                                Cancelar
                            </button>
                            <button
                                className="btn-confirmar"
                                onClick={() => {
                                    setConfirmarPedido(false);
                                    finalizarCompra(dadosEntrega);
                                }}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Carrinho;