import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Cozinha.css";

const STATUS_COCINA = [
  "Pedido Recebido",
  "Em preparo",
  "Pronto para entrega",
  "Entregue",
];

const FILTROS_STATUS = [
  "Todos",
  "Pedido Recebido",
  "Em preparo",
  "Pronto para entrega",
  "Entregue",
];

const LISTA_PRODUTOS = [
  { nome: "X-Burguer", preco: 15.9 },
  { nome: "X-Salada", preco: 17.5 },
  { nome: "Batata Frita", preco: 10 },
  { nome: "Coca-Cola", preco: 6 },
  { nome: "Fanta Uva", preco: 6 },
  { nome: "Milk Shake", preco: 12 },
  { nome: "Hot Dog", preco: 13.5 },
  { nome: "Suco Natural", preco: 8 },
];

function gerarPedidoAleatorio() {
  const quantidadeProdutos =
    Math.floor(Math.random() * 3) + 1;

  const produtosSelecionados = [];

  for (let i = 0; i < quantidadeProdutos; i++) {
    const produto =
      LISTA_PRODUTOS[
        Math.floor(Math.random() * LISTA_PRODUTOS.length)
      ];

    const itemExistente =
      produtosSelecionados.find(
        (item) => item.nome === produto.nome
      );

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      produtosSelecionados.push({
        nome: produto.nome,
        quantidade: 1,
        preco: produto.preco,
        categoria: "Lanche",
      });
    }
  }

  const total = produtosSelecionados.reduce(
    (soma, item) =>
      soma + item.preco * item.quantidade,
    0
  );

  const statusAleatorio =
    Math.random() > 0.7
      ? "Pronto para entrega"
      : "Pedido Recebido";

  return {
    numero:
      Math.floor(Math.random() * 9000) + 1000,

    mesa:
      Math.floor(Math.random() * 12) + 1,

    status: statusAleatorio,

    produtos: produtosSelecionados,

    total,

    criadoEm: Date.now(),

    prioridade:
      Math.random() > 0.7
        ? "Alta"
        : "Normal",

    simulado: true,
  };
}

function Cozinha() {
  const navigate = useNavigate();

  const {
    pedidos,
    atualizarStatusPedido,
    setToastMensagem,
  } = useOutletContext();

  const intervaloRef = useRef(null);

  const [pedidosSimulados, setPedidosSimulados] =
    useState(() => [
      gerarPedidoAleatorio(),
      gerarPedidoAleatorio(),
    ]);

  const [filtroStatus, setFiltroStatus] =
    useState("Todos");

  const [notificacao, setNotificacao] =
    useState("");

  const [simulando, setSimulando] =
    useState(false);

  /*
   * Junta os pedidos reais do cliente
   * com os pedidos criados pelo simulador.
   */
  const listaPedidos = useMemo(
    () => [...pedidos, ...pedidosSimulados],
    [pedidos, pedidosSimulados]
  );

  /*
   * Som de notificação.
   */
  const playNotificationSound = () => {
    const AudioCtx =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioCtx) return;

    const audioContext = new AudioCtx();

    const oscillator =
      audioContext.createOscillator();

    const gainNode =
      audioContext.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.value = 880;

    gainNode.gain.value = 0.05;

    oscillator.connect(gainNode);
    gainNode.connect(
      audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
      audioContext.currentTime + 0.12
    );
  };

  /*
   * Mostra uma notificação no painel.
   */
  const exibirNotificacao = (titulo) => {
    setNotificacao(titulo);

    playNotificationSound();

    window.setTimeout(() => {
      setNotificacao("");
    }, 2600);
  };

  /*
   * Descobre o próximo status.
   */
  const proximoStatus = (statusAtual) => {
    const indiceAtual =
      STATUS_COCINA.indexOf(statusAtual);

    if (indiceAtual === -1) {
      return STATUS_COCINA[0];
    }

    return STATUS_COCINA[
      Math.min(
        indiceAtual + 1,
        STATUS_COCINA.length - 1
      )
    ];
  };

  /*
   * Simulador automático.
   *
   * A cada 7 segundos:
   *
   * - se não houver pedidos simulados ativos,
   *   cria um novo;
   *
   * - caso contrário, escolhe um pedido
   *   simulado e avança seu status.
   */
  useEffect(() => {
    if (!simulando) {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }

      return;
    }

    intervaloRef.current =
      setInterval(() => {
        setPedidosSimulados((prev) => {
          const ativos = prev.filter(
            (pedido) =>
              pedido.status !== "Entregue"
          );

          /*
           * Se todos os pedidos simulados
           * estiverem entregues, cria outro.
           */
          if (ativos.length === 0) {
            const novoPedido =
              gerarPedidoAleatorio();

            exibirNotificacao(
              `Novo pedido #${novoPedido.numero}`
            );

            return [
              novoPedido,
              ...prev,
            ];
          }

          /*
           * Escolhe aleatoriamente um pedido
           * simulado ainda ativo.
           */
          const pedidoEscolhido =
            ativos[
              Math.floor(
                Math.random() *
                  ativos.length
              )
            ];

          const novoStatus =
            proximoStatus(
              pedidoEscolhido.status ||
                "Pedido Recebido"
            );

          const atualizados =
            prev.map((pedido) => {
              if (
                pedido.numero !==
                pedidoEscolhido.numero
              ) {
                return pedido;
              }

              return {
                ...pedido,

                status: novoStatus,

                prioridade:
                  novoStatus ===
                  "Pronto para entrega"
                    ? "Alta"
                    : pedido.prioridade,
              };
            });

          exibirNotificacao(
            `Pedido #${pedidoEscolhido.numero} → ${novoStatus}`
          );

          return atualizados;
        });
      }, 7000);

    return () => {
      if (intervaloRef.current) {
        clearInterval(
          intervaloRef.current
        );

        intervaloRef.current = null;
      }
    };
  }, [simulando]);

  /*
   * Quantidade de pedidos ativos.
   */
  const pedidosAtivos = useMemo(
    () =>
      listaPedidos.filter(
        (pedido) =>
          pedido.status !== "Entregue"
      ).length,
    [listaPedidos]
  );

  /*
   * Quantidade de pedidos por status.
   */
  const resumoPorStatus = useMemo(
    () =>
      STATUS_COCINA.reduce(
        (acc, status) => {
          acc[status] =
            listaPedidos.filter(
              (pedido) =>
                (pedido.status ||
                  "Pedido Recebido") ===
                status
            ).length;

          return acc;
        },
        {}
      ),
    [listaPedidos]
  );

  /*
   * Filtragem e ordenação.
   */
  const pedidosFiltrados = useMemo(() => {
    const base =
      filtroStatus === "Todos"
        ? listaPedidos
        : listaPedidos.filter(
            (pedido) =>
              (pedido.status ||
                "Pedido Recebido") ===
              filtroStatus
          );

    return [...base].sort((a, b) => {
      const ordem = {
        "Pedido Recebido": 0,
        "Em preparo": 1,
        "Pronto para entrega": 2,
        Entregue: 3,
      };

      const prioridade = {
        Alta: 0,
        Normal: 1,
      };

      const statusA =
        a.status ||
        "Pedido Recebido";

      const statusB =
        b.status ||
        "Pedido Recebido";

      const diferencaStatus =
        ordem[statusA] -
        ordem[statusB];

      if (diferencaStatus !== 0) {
        return diferencaStatus;
      }

      return (
        (prioridade[
          a.prioridade || "Normal"
        ] ?? 1) -
        (prioridade[
          b.prioridade || "Normal"
        ] ?? 1)
      );
    });
  }, [
    listaPedidos,
    filtroStatus,
  ]);

  /*
   * Avança pedido real ou simulado.
   */
  const avancarPedido = (pedido) => {
    const statusAtual =
      pedido.status ||
      "Pedido Recebido";

    const novoStatus =
      proximoStatus(statusAtual);

    /*
     * Pedido real:
     * atualiza o estado compartilhado
     * no Home.jsx.
     */
    if (!pedido.simulado) {
      atualizarStatusPedido(
        pedido.numero,
        novoStatus
      );
    }

    /*
     * Pedido simulado:
     * atualiza somente a lista simulada.
     */
    if (pedido.simulado) {
      setPedidosSimulados(
        (prev) =>
          prev.map((item) =>
            item.numero ===
            pedido.numero
              ? {
                  ...item,
                  status: novoStatus,
                }
              : item
          )
      );
    }

    const mensagens = {
      "Em preparo":
        `Pedido #${pedido.numero} aceito e enviado para preparo.`,

      "Pronto para entrega":
        `Pedido #${pedido.numero} está pronto para entrega.`,

      Entregue:
        `Pedido #${pedido.numero} marcado como entregue.`,
    };

    const mensagem =
      mensagens[novoStatus] ||
      `Pedido #${pedido.numero} atualizado.`;

    setToastMensagem(mensagem);

    exibirNotificacao(mensagem);
  };

  /*
   * Cria manualmente um pedido simulado.
   */
  const gerarNovoPedido = () => {
    const pedido =
      gerarPedidoAleatorio();

    setPedidosSimulados(
      (prev) => [
        pedido,
        ...prev,
      ]
    );

    exibirNotificacao(
      `Novo pedido #${pedido.numero}`
    );
  };

  /*
   * Remove somente pedidos simulados
   * que já foram entregues.
   *
   * Pedidos reais permanecem no Home
   * para manter o histórico.
   */
  const removerPedidoEntregue = (
    pedido
  ) => {
    if (pedido.simulado) {
      setPedidosSimulados(
        (prev) =>
          prev.filter(
            (item) =>
              item.numero !==
              pedido.numero
          )
      );

      setToastMensagem(
        `Pedido #${pedido.numero} removido da fila simulada.`
      );

      return;
    }

    setToastMensagem(
      `O pedido #${pedido.numero} permanece no histórico.`
    );
  };

  /*
   * Logout.
   */
  const logout = () => {
    navigate("/");
  };

  /*
   * Formatação do tempo.
   */
  const formatarTempo = (pedido) => {
    if (!pedido.criadoEm) {
      return "Agora";
    }

    const diferencaMs =
      Date.now() -
      pedido.criadoEm;

    const segundos = Math.max(
      0,
      Math.floor(
        diferencaMs / 1000
      )
    );

    const minutos =
      Math.floor(
        segundos / 60
      );

    if (minutos > 0) {
      return `${minutos} min`;
    }

    return `${segundos}s`;
  };

  return (
    <div className="cozinha-container">
      <header className="cabecalho-cozinha">
        <div>
          <p className="eyebrow">
            Área operacional
          </p>

          <h1>
            Painel da Cozinha
          </h1>
        </div>

        <div className="cabecalho-acoes">
          <div className="status-resumo">
            <div className="resumo-item">
              <span>
                Ativos
              </span>

              <strong>
                {pedidosAtivos}
              </strong>
            </div>

            <div className="resumo-item destaque">
              <span>
                Fila
              </span>

              <strong>
                {listaPedidos.length}
              </strong>
            </div>
          </div>

          <button
            className="btn-logout-cozinha"
            onClick={logout}
          >
            ↪ Logout
          </button>
        </div>
      </header>

      <div className="resumo-status-cozinha">
        {STATUS_COCINA.map(
          (status) => (
            <div
              key={status}
              className="chip-status"
            >
              <span className="chip-label">
                {status}
              </span>

              <strong>
                {resumoPorStatus[
                  status
                ] || 0}
              </strong>
            </div>
          )
        )}
      </div>

      <div className="toolbar-cozinha">
        <div className="notificacao-cozinha">
          <span className="icone-notificacao">
            !
          </span>

          <span
            className={
              notificacao
                ? "ativo"
                : ""
            }
          >
            {notificacao ||
              "Sem notificações recentes"}
          </span>
        </div>

        <div className="acoes-cozinha">
          <button
            className="btn-gerar-pedido"
            onClick={
              gerarNovoPedido
            }
          >
            + Gerar pedido aleatório
          </button>

          <button
            className={`btn-simulacao ${
              simulando
                ? "ligado"
                : ""
            }`}
            onClick={() =>
              setSimulando(
                (prev) => !prev
              )
            }
          >
            {simulando
              ? "⏸ Parar simulação"
              : "▶ Simular pedidos"}
          </button>
        </div>
      </div>

      <div className="filtros-cozinha">
        {FILTROS_STATUS.map(
          (status) => (
            <button
              key={status}
              type="button"
              className={
                filtroStatus ===
                status
                  ? "filtro ativo"
                  : "filtro"
              }
              onClick={() =>
                setFiltroStatus(
                  status
                )
              }
            >
              {status}
            </button>
          )
        )}
      </div>

      {pedidosFiltrados.length ===
      0 ? (
        <div className="cozinha-vazio">
          <h2>
            Sem pedidos no momento
          </h2>

          <p>
            O painel está livre e
            pronto para receber
            novos pedidos.
          </p>
        </div>
      ) : (
        <div className="lista-pedidos-cozinha">
          {pedidosFiltrados.map(
            (pedido) => {
              const statusAtual =
                pedido.status ||
                "Pedido Recebido";

              const indiceStatus =
                STATUS_COCINA.indexOf(
                  statusAtual
                );

              const statusClass = `status-${statusAtual
                .toLowerCase()
                .replace(
                  /\s+/g,
                  "-"
                )}`;

              const prioridade =
                pedido.prioridade ||
                "Normal";

              return (
                <article
                  className={`pedido-cozinha ${
                    statusAtual ===
                    "Pedido Recebido"
                      ? "novo-pedido"
                      : ""
                  } ${
                    prioridade ===
                    "Alta"
                      ? "prioridade-alta"
                      : ""
                  }`}
                  key={`${pedido.simulado ? "simulado" : "real"}-${pedido.numero}`}
                >
                  <div className="pedido-header">
                    <div>
                      <p className="pedido-label">
                        {pedido.simulado
                          ? "Pedido simulado"
                          : "Pedido"}
                      </p>

                      <h2>
                        #{pedido.numero}
                      </h2>
                    </div>

                    <div className="header-badges">
                      {prioridade ===
                        "Alta" && (
                        <span className="badge-prioridade alta">
                          Alta
                        </span>
                      )}

                      <span
                        className={`badge-status ${statusClass}`}
                      >
                        {statusAtual}
                      </span>
                    </div>
                  </div>

                  <div className="pedido-meta">
                    <span>
                      {pedido.mesa
                        ? `Mesa ${pedido.mesa}`
                        : "Entrega"}
                    </span>

                    <span>
                      {pedido.produtos.length}{" "}
                      {pedido.produtos
                        .length === 1
                        ? "item"
                        : "itens"}
                    </span>

                    <span className="tempo-pedido">
                      {formatarTempo(
                        pedido
                      )}
                    </span>
                  </div>

                  <div className="itens-cozinha">
                    {pedido.produtos.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          className="item-cozinha"
                          key={`${pedido.numero}-${item.nome}-${index}`}
                        >
                          <span>
                            {item.quantidade}x{" "}
                            {item.nome}
                          </span>

                          <strong>
                            R${" "}
                            {(
                              item.preco *
                              item.quantidade
                            )
                              .toFixed(
                                2
                              )
                              .replace(
                                ".",
                                ","
                              )}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="pedido-footer">
                    <div className="total-cozinha">
                      <span>
                        Total
                      </span>

                      <strong>
                        R${" "}
                        {Number(
                          pedido.total ||
                            0
                        )
                          .toFixed(
                            2
                          )
                          .replace(
                            ".",
                            ","
                          )}
                      </strong>
                    </div>

                    <div className="barra-status">
                      {STATUS_COCINA.map(
                        (
                          status,
                          index
                        ) => (
                          <span
                            key={`${pedido.numero}-${status}`}
                            className={
                              index <=
                              indiceStatus
                                ? "ativo"
                                : ""
                            }
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="acoes-pedido">
                    {statusAtual !==
                      "Entregue" && (
                      <button
                        type="button"
                        className="btn-acao btn-primario"
                        onClick={() =>
                          avancarPedido(
                            pedido
                          )
                        }
                      >
                        {statusAtual ===
                        "Pedido Recebido"
                          ? "Aceitar pedido"
                          : statusAtual ===
                            "Em preparo"
                          ? "Preparar"
                          : "Enviar"}
                      </button>
                    )}

                    {statusAtual ===
                      "Entregue" && (
                      <button
                        type="button"
                        className="btn-acao btn-limpar"
                        onClick={() =>
                          removerPedidoEntregue(
                            pedido
                          )
                        }
                      >
                        Remover
                      </button>
                    )}
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default Cozinha;

