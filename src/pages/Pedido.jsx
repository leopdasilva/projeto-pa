import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Pedido.css";

function Pedido() {
  const {
    pedidos,
    limparCarrinho,
  } = useOutletContext();

  const navigate = useNavigate();

  // Pega o pedido mais recente
  const pedido = pedidos[pedidos.length - 1];

  const etapas = [
    "Pedido Recebido",
    "Em Preparação",
    "Saiu para Entrega",
    "Pedido Entregue",
  ];

  const [etapaAtual, setEtapaAtual] = useState(0);
  const [entregue, setEntregue] = useState(false);

  // Quando não houver pedido
  if (!pedido) {
    return (
      <div className="pedido-container">
        <h2>Nenhum pedido encontrado.</h2>

        <button onClick={() => navigate("/home")}>
          Voltar ao Cardápio
        </button>
      </div>
    );
  }

  // Simula a evolução do pedido
  useEffect(() => {
    if (etapaAtual < etapas.length - 1) {
      const timer = setTimeout(() => {
        setEtapaAtual((prev) => prev + 1);
      }, 8000);

      return () => clearTimeout(timer);
    }

    setEntregue(true);
  }, [etapaAtual]);

  return (
    <div className="pedido-container">
      <h2 className="titulo-pedido">
        Acompanhe seu Pedido
      </h2>

      <div className="linha-progresso">
        {etapas.map((etapa, index) => (
          <div
            key={index}
            className={
              index <= etapaAtual
                ? "etapa ativa"
                : "etapa"
            }
          >
            <div className="circulo">
              {index < etapaAtual ? "✓" : index + 1}
            </div>

            <p>{etapa}</p>
          </div>
        ))}
      </div>

      <div className="status-pedido">
        <h3>Status Atual</h3>

        <p className="status">
          {etapas[etapaAtual]}
        </p>
      </div>

      {/* Pedido enviado para a cozinha */}
      {(etapaAtual === 0 || etapaAtual === 1) && (
        <div className="cozinha">
          <h2>
            Cozinha Xpress Food
          </h2>

          <p>
            <strong>Pedido Nº:</strong> #{pedido.numero}
          </p>

          <p className="mensagem-cozinha">
            Seu pedido foi enviado para a cozinha e
            nossa equipe já está preparando tudo para você.
          </p>

          <div className="produtos-cozinha">
            <h3>Itens do Pedido</h3>

            {pedido.produtos.map((item, index) => (
              <div
                className="produto-cozinha"
                key={index}
              >
                <span>
                  {item.quantidade}x {item.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recibo após a entrega */}
      {entregue && (
        <div className="recibo">
          <h2>Recibo</h2>

          <p>
            <strong>Pedido Nº:</strong> #{pedido.numero}
          </p>

          {pedido.produtos.map((item, index) => (
            <div
              className="linha-recibo"
              key={index}
            >
              <span>{item.nome}</span>

              <span>
                {item.quantidade}x - R${" "}
                {(item.preco * item.quantidade)
                  .toFixed(2)
                  .replace(".", ",")}
              </span>
            </div>
          ))}

          <div className="linha-recibo">
            <span>Subtotal</span>

            <span>
              R${" "}
              {(pedido.subtotal ?? pedido.total)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>

          <div className="linha-recibo">
            <span>Entrega</span>

            <span>
              R${" "}
              {(pedido.taxaEntrega ?? 0)
                .toFixed(2)
                .replace(".", ",")}
            </span>
          </div>

          <div className="linha-recibo">
            <span>Local</span>

            <span>
              {pedido.endereco || "Rua da Entrega"},{" "}
              {pedido.numeroEndereco || "S/N"}
            </span>
          </div>

          <div className="linha-recibo">
            <span>Pagamento</span>

            <span>
              {pedido.formaPagamento || "Dinheiro"}
            </span>
          </div>

          <hr />

          <h3>
            Total: R${" "}
            {pedido.total
              .toFixed(2)
              .replace(".", ",")}
          </h3>

          <button
            onClick={() => {
              limparCarrinho();
              navigate("/home");
            }}
          >
            Voltar ao Cardápio
          </button>
        </div>
      )}
    </div>
  );
}

export default Pedido;