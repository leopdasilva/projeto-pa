import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cozinha.css";

const STATUS_COCINA = [
    "Pedido Recebido",
    "Em preparo",
    "Pronto para entrega",
    "Entregue"
];

const FILTROS_STATUS = [
    "Todos",
    "Pedido Recebido",
    "Em preparo",
    "Pronto para entrega",
    "Entregue"
];

const LISTA_PRODUTOS = [
    { nome: "X-Burguer", preco: 15.9 },
    { nome: "X-Salada", preco: 17.5 },
    { nome: "Batata Frita", preco: 10 },
    { nome: "Coca-Cola", preco: 6 },
    { nome: "Fanta Uva", preco: 6 },
    { nome: "Milk Shake", preco: 12 },
    { nome: "Hot Dog", preco: 13.5 },
    { nome: "Suco Natural", preco: 8 }
];

function gerarPedidoAleatorio() {
    const quantidadeProdutos = Math.floor(Math.random() * 3) + 1;
    const produtosSelecionados = [];

    for (let i = 0; i < quantidadeProdutos; i++) {
        const produto = LISTA_PRODUTOS[Math.floor(Math.random() * LISTA_PRODUTOS.length)];
        const itemExistente = produtosSelecionados.find(item => item.nome === produto.nome);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            produtosSelecionados.push({
                nome: produto.nome,
                quantidade: 1,
                preco: produto.preco,
                categoria: "Lanche"
            });
        }
    }

    const total = produtosSelecionados.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    const statusAleatorio = Math.random() > 0.7 ? "Pronto para entrega" : "Pedido Recebido";

    return {
        numero: Math.floor(Math.random() * 9000) + 1000,
        mesa: Math.floor(Math.random() * 12) + 1,
        status: statusAleatorio,
        produtos: produtosSelecionados,
        total,
        criadoEm: Date.now(),
        prioridade: Math.random() > 0.7 ? "Alta" : "Normal"
    };
}

function Cozinha({ pedidos = [] }) {
    const navigate = useNavigate();
    const intervaloRef = useRef(null);

    const [listaPedidos, setListaPedidos] = useState(() => {
        if (pedidos.length > 0) return pedidos;
        return [gerarPedidoAleatorio(), gerarPedidoAleatorio()];
    });

    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [notificacao, setNotificacao] = useState("");
    const [simulando, setSimulando] = useState(false);

    const playNotificationSound = () => {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;

        if (!AudioCtx) return;

        const audioContext = new AudioCtx();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.05;

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.12);
    };

    const exibirNotificacao = (titulo) => {
        setNotificacao(titulo);
        playNotificationSound();

        window.setTimeout(() => {
            setNotificacao("");
        }, 2600);
    };

    useEffect(() => {
        if (pedidos.length > 0) {
            setListaPedidos(pedidos);
        }
    }, [pedidos]);

    useEffect(() => {
        if (!simulando) {
            if (intervaloRef.current) {
                clearInterval(intervaloRef.current);
            }
            return;
        }

        intervaloRef.current = setInterval(() => {
            setListaPedidos(prev => {
                const ativos = prev.filter(pedido => pedido.status !== "Entregue");

                if (ativos.length === 0) {
                    const pedido = gerarPedidoAleatorio();
                    exibirNotificacao(`Novo pedido #${pedido.numero}`);
                    return [pedido, ...prev];
                }

                const pedidoEscolhido = ativos[Math.floor(Math.random() * ativos.length)];
                const novoStatus = proximoStatus(pedidoEscolhido.status || "Pedido Recebido");

                const atualizado = prev.map(pedido => {
                    if (pedido.numero !== pedidoEscolhido.numero) return pedido;
                    return {
                        ...pedido,
                        status: novoStatus,
                        prioridade: novoStatus === "Pronto para entrega" ? "Alta" : pedido.prioridade
                    };
                });

                exibirNotificacao(`Pedido #${pedidoEscolhido.numero} → ${novoStatus}`);
                return atualizado;
            });
        }, 7000);

        return () => {
            if (intervaloRef.current) {
                clearInterval(intervaloRef.current);
            }
        };
    }, [simulando]);

    const pedidosAtivos = useMemo(
        () => listaPedidos.filter(pedido => pedido.status !== "Entregue").length,
        [listaPedidos]
    );

    const resumoPorStatus = useMemo(
        () => STATUS_COCINA.reduce((acc, status) => {
            acc[status] = listaPedidos.filter(pedido => (pedido.status || "Pedido Recebido") === status).length;
            return acc;
        }, {}),
        [listaPedidos]
    );

    const pedidosFiltrados = useMemo(() => {
        const base = filtroStatus === "Todos" ? listaPedidos : listaPedidos.filter(pedido => pedido.status === filtroStatus);

        return [...base].sort((a, b) => {
            const ordem = {
                "Pedido Recebido": 0,
                "Em preparo": 1,
                "Pronto para entrega": 2,
                "Entregue": 3
            };

            const prioridade = {
                Alta: 0,
                Normal: 1
            };

            const diferencaStatus = ordem[a.status || "Pedido Recebido"] - ordem[b.status || "Pedido Recebido"];
            if (diferencaStatus !== 0) return diferencaStatus;
            return (prioridade[a.prioridade || "Normal"] ?? 1) - (prioridade[b.prioridade || "Normal"] ?? 1);
        });
    }, [listaPedidos, filtroStatus]);

    const proximoStatus = (statusAtual) => {
        const indiceAtual = STATUS_COCINA.indexOf(statusAtual);
        return STATUS_COCINA[Math.min(indiceAtual + 1, STATUS_COCINA.length - 1)];
    };

    const avancarPedido = (numeroPedido) => {
        setListaPedidos(prev =>
            prev.map(pedido => {
                if (pedido.numero !== numeroPedido) return pedido;

                const statusAtual = pedido.status || "Pedido Recebido";
                const proximo = proximoStatus(statusAtual);

                return {
                    ...pedido,
                    status: proximo
                };
            })
        );
    };

    const gerarNovoPedido = () => {
        const pedido = gerarPedidoAleatorio();
        setListaPedidos(prev => [pedido, ...prev]);
        exibirNotificacao(`Novo pedido #${pedido.numero}`);
    };

    const removerPedidoEntregue = (numeroPedido) => {
        setListaPedidos(prev => prev.filter(pedido => pedido.numero !== numeroPedido));
    };

    const logout = () => {
        navigate("/");
    };

    const formatarTempo = (pedido) => {
        const criadoEm = pedido.criadoEm || Date.now();
        const diferencaMs = Date.now() - criadoEm;
        const segundos = Math.max(0, Math.floor(diferencaMs / 1000));
        const minutos = Math.floor(segundos / 60);

        if (minutos > 0) {
            return `${minutos} min`; 
        }

        return `${segundos}s`;
    };

    return (
        <div className="cozinha-container">
            <header className="cabecalho-cozinha">
                <div>
                    <p className="eyebrow">Área operacional</p>
                    <h1>Painel da Cozinha</h1>
                </div>

                <div className="cabecalho-acoes">
                    <div className="status-resumo">
                        <div className="resumo-item">
                            <span>Ativos</span>
                            <strong>{pedidosAtivos}</strong>
                        </div>
                        <div className="resumo-item destaque">
                            <span>Fila</span>
                            <strong>{listaPedidos.length}</strong>
                        </div>
                    </div>

                    <button className="btn-logout-cozinha" onClick={logout}>
                        ↪ Logout
                    </button>
                </div>
            </header>

            <div className="resumo-status-cozinha">
                {STATUS_COCINA.map(status => (
                    <div key={status} className="chip-status">
                        <span className="chip-label">{status}</span>
                        <strong>{resumoPorStatus[status] || 0}</strong>
                    </div>
                ))}
            </div>

            <div className="toolbar-cozinha">
                <div className="notificacao-cozinha">
                    <span className="icone-notificacao">🔔</span>
                    <span className={notificacao ? "ativo" : ""}>
                        {notificacao || "Sem notificações recentes"}
                    </span>
                </div>

                <div className="acoes-cozinha">
                    <button className="btn-gerar-pedido" onClick={gerarNovoPedido}>
                        + Gerar pedido aleatório
                    </button>

                    <button
                        className={`btn-simulacao ${simulando ? "ligado" : ""}`}
                        onClick={() => setSimulando(prev => !prev)}
                    >
                        {simulando ? "⏸ Parar simulação" : "▶ Simular pedidos"}
                    </button>
                </div>
            </div>

            <div className="filtros-cozinha">
                {FILTROS_STATUS.map(status => (
                    <button
                        key={status}
                        className={filtroStatus === status ? "filtro ativo" : "filtro"}
                        onClick={() => setFiltroStatus(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {pedidosFiltrados.length === 0 ? (
                <div className="cozinha-vazio">
                    <h2>Sem pedidos no momento</h2>
                    <p>O painel está livre e pronto para receber novos pedidos.</p>
                </div>
            ) : (
                <div className="lista-pedidos-cozinha">
                    {pedidosFiltrados.map((pedido) => {
                        const indiceStatus = STATUS_COCINA.indexOf(pedido.status || "Pedido Recebido");
                        const statusClass = `status-${(pedido.status || "Pedido Recebido").toLowerCase().replace(/\s+/g, "-")}`;
                        const prioridade = pedido.prioridade || "Normal";

                        return (
                            <article
                                className={`pedido-cozinha ${pedido.status === "Pedido Recebido" ? "novo-pedido" : ""} ${prioridade === "Alta" ? "prioridade-alta" : ""}`}
                                key={pedido.numero}
                            >
                                <div className="pedido-header">
                                    <div>
                                        <p className="pedido-label">Pedido</p>
                                        <h2>#{pedido.numero}</h2>
                                    </div>
                                    <div className="header-badges">
                                        {prioridade === "Alta" && <span className="badge-prioridade alta">Alta</span>}
                                        <span className={`badge-status ${statusClass}`}>
                                            {pedido.status || "Pedido Recebido"}
                                        </span>
                                    </div>
                                </div>

                                <div className="pedido-meta">
                                    <span>Mesa {pedido.mesa || "—"}</span>
                                    <span>{pedido.produtos.length} itens</span>
                                    <span className="tempo-pedido">{formatarTempo(pedido)}</span>
                                </div>

                                <div className="itens-cozinha">
                                    {pedido.produtos.map((item, i) => (
                                        <div className="item-cozinha" key={`${pedido.numero}-${item.nome}-${i}`}>
                                            <span>
                                                {item.quantidade}x {item.nome}
                                            </span>
                                            <strong>
                                                R$ {(item.preco * item.quantidade).toFixed(2).replace(".",",")}
                                            </strong>
                                        </div>
                                    ))}
                                </div>

                                <div className="pedido-footer">
                                    <div className="total-cozinha">
                                        <span>Total</span>
                                        <strong>R$ {Number(pedido.total || 0).toFixed(2).replace(".",",")}</strong>
                                    </div>

                                    <div className="barra-status">
                                        {STATUS_COCINA.map((status, index) => (
                                            <span
                                                key={`${pedido.numero}-${status}`}
                                                className={index <= indiceStatus ? "ativo" : ""}
                                            ></span>
                                        ))}
                                    </div>
                                </div>

                                <div className="acoes-pedido">
                                    {pedido.status !== "Entregue" && (
                                        <button
                                            className="btn-acao btn-primario"
                                            onClick={() => avancarPedido(pedido.numero)}
                                        >
                                            {pedido.status === "Pedido Recebido"
                                                ? "Aceitar pedido"
                                                : pedido.status === "Em preparo"
                                                    ? "Preparar"
                                                    : "Enviar"}
                                        </button>
                                    )}

                                    {pedido.status === "Entregue" && (
                                        <button
                                            className="btn-acao btn-limpar"
                                            onClick={() => removerPedidoEntregue(pedido.numero)}
                                        >
                                            Remover
                                        </button>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Cozinha;
