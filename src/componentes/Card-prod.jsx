import { useState } from "react";
import "./Card-prod.css";

function CardProduto(props) {
  // Controla a quantidade escolhida por item e o estado visual de confirmação.
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  function aumentarQuantidade() {
    setQuantidade((prev) => prev + 1);
  }

  function diminuirQuantidade() {
    if (quantidade > 1) {
      setQuantidade((prev) => prev - 1);
    }
  }

  function adicionarCarrinho() {
    props.adicionarCarrinho(
      props.nome,
      props.preco,
      props.categoria,
      props.imagem,
      quantidade
    );

    setAdicionado(true);
    setQuantidade(1);

    window.setTimeout(() => {
      setAdicionado(false);
    }, 1200);
  }

  return (
    <div className="produto-card">
      <img src={props.imagem} alt={props.nome} className="produto-imagem" />

      <h3>{props.nome}</h3>

      <p className="categoria">Categoria: {props.categoria}</p>

      <p className="preco">R$ {props.preco.toFixed(2).replace(".", ",")}</p>

      <p className="descricao">{props.descricao}</p>

      <div className="controle-quantidade">
        <button type="button" onClick={diminuirQuantidade}>
          -
        </button>

        <span>{quantidade}</span>

        <button type="button" onClick={aumentarQuantidade}>
          +
        </button>
      </div>

      <button
        type="button"
        className={adicionado ? "botao-carrinho adicionado" : "botao-carrinho"}
        onClick={adicionarCarrinho}
      >
        {adicionado ? "✓ Adicionado" : "Adicionar ao Carrinho"}
      </button>
    </div>
  );
}

export default CardProduto;