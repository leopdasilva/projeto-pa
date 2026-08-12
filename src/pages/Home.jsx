import { useMemo, useState } from "react";

import {
  Outlet,
  useNavigate,
  useOutletContext,
  useLocation,
} from "react-router-dom";

import Layout from "../componentes/Layout";
import CardProduto from "../componentes/Card-prod";
import Funcionario from "../componentes/Funcionario";
import Toast from "../componentes/Toast";

import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // PRODUTOS
  // =========================

  const produtos = [
    {
      id: 1,
      nome: "X-Burguer",
      preco: 15.9,
      categoria: "Hambúrguer",
      descricao:
        "Hambúrguer artesanal com queijo prato derretido, molho especial da casa e pão brioche levemente tostado.",
      imagem: "/imagens/xburguer.jpg",
    },
    {
      id: 2,
      nome: "X-Salada",
      preco: 17.5,
      categoria: "Hambúrguer",
      descricao:
        "Hambúrguer artesanal com queijo, alface crocante, tomate fresco e maionese especial no pão brioche.",
      imagem: "/imagens/xsalada.jpg",
    },
    {
      id: 3,
      nome: "Fanta Uva",
      preco: 6,
      categoria: "Bebida",
      descricao:
        "Refrigerante Fanta Uva em lata de 350 ml, servido bem gelado para acompanhar seu lanche.",
      imagem: "/imagens/fantauva.jpg",
    },
    {
      id: 4,
      nome: "Coca-Cola",
      preco: 6,
      categoria: "Bebida",
      descricao:
        "Coca-Cola tradicional em lata de 350 ml, refrescante e perfeita para qualquer refeição.",
      imagem: "/imagens/coca.jpg",
    },
    {
      id: 5,
      nome: "Batata Frita",
      preco: 10,
      categoria: "Porção",
      descricao:
        "Porção de batatas fritas douradas e crocantes, preparadas na hora e levemente temperadas.",
      imagem: "/imagens/batata.jpg",
    },
    {
      id: 6,
      nome: "Milk Shake",
      preco: 12,
      categoria: "Sobremesa",
      descricao:
        "Milk shake cremoso preparado com sorvete e leite, disponível em deliciosos sabores.",
      imagem: "/imagens/milkshake.jpg",
    },
    {
      id: 7,
      nome: "Hot Dog",
      preco: 13.5,
      categoria: "Lanche",
      descricao:
        "Cachorro-quente com salsicha, molho de tomate, milho, batata palha e maionese especial.",
      imagem: "/imagens/hotdog.jpg",
    },
    {
      id: 8,
      nome: "Suco Natural",
      preco: 8,
      categoria: "Bebida",
      descricao:
        "Suco natural preparado com frutas frescas, sem conservantes e servido gelado.",
      imagem: "/imagens/suco.jpg",
    },
  ];

  // =========================
  // FUNCIONÁRIOS
  // =========================

  const funcionarios = [
    {
      id: 1,
      nome: "Cesar Stati",
      cargo: "CEO",
      fotoUrl: "/imagens/ceo.png",
    },
    {
      id: 2,
      nome: "Donathan Goncalves",
      cargo: "Chef de Cozinha",
      fotoUrl: "/imagens/chef.png",
    },
    {
      id: 3,
      nome: "Alexandre Gaspari",
      cargo: "Atendente",
      fotoUrl: "/imagens/atendente.png",
    },
  ];

  // =========================
  // ESTADOS
  // =========================

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const [busca, setBusca] = useState("");

  const [carrinho, setCarrinho] = useState([]);

  const [pedidos, setPedidos] = useState([]);

  const [toastMensagem, setToastMensagem] = useState("");

  // =========================
  // CATEGORIAS
  // =========================

  const categorias = useMemo(
    () => [
      "Todos",
      ...new Set(produtos.map((produto) => produto.categoria)),
    ],
    []
  );

  // =========================
  // FILTRO DOS PRODUTOS
  // =========================

  const produtosFiltrados = useMemo(() => {
    const textoBusca = busca.trim().toLowerCase();

    return produtos.filter((produto) => {
      const categoriaOk =
        categoriaSelecionada === "Todos" ||
        produto.categoria === categoriaSelecionada;

      const buscaOk =
        textoBusca === "" ||
        produto.nome.toLowerCase().includes(textoBusca);

      return categoriaOk && buscaOk;
    });
  }, [busca, categoriaSelecionada]);

  // =========================
  // QUANTIDADE DO CARRINHO
  // =========================

  const quantidadeCarrinho = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // =========================
  // ADICIONAR AO CARRINHO
  // =========================

  function adicionarCarrinho(
    nome,
    preco,
    categoria,
    imagem,
    quantidade
  ) {
    setCarrinho((prev) => {
      const produtoExistente = prev.find(
        (item) => item.nome === nome
      );

      if (produtoExistente) {
        return prev.map((item) =>
          item.nome === nome
            ? {
                ...item,
                quantidade: item.quantidade + quantidade,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          nome,
          preco,
          categoria,
          imagem,
          quantidade,
        },
      ];
    });

    setToastMensagem(
      `${quantidade}x ${nome} adicionado ao carrinho`
    );
  }

  // =========================
  // LIMPAR CARRINHO
  // =========================

  function limparCarrinho() {
    setCarrinho([]);
  }

  // =========================
  // REMOVER ITEM
  // =========================

  function removerItem(nome) {
    setCarrinho((prev) =>
      prev.filter((item) => item.nome !== nome)
    );
  }

  // =========================
  // AUMENTAR QUANTIDADE
  // =========================

  function aumentarQuantidade(nome) {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.nome === nome
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    );
  }

  // =========================
  // DIMINUIR QUANTIDADE
  // =========================

  function diminuirQuantidade(nome) {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.nome === nome
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  // =========================
  // TOTAL DO CARRINHO
  // =========================

  const totalCarrinho = carrinho.reduce(
    (total, item) =>
      total + item.preco * item.quantidade,
    0
  );

  // =========================
  // FINALIZAR COMPRA
  // =========================

  function finalizarCompra(dadosEntrega = {}) {
    if (carrinho.length === 0) {
      setToastMensagem("Seu carrinho está vazio.");
      return;
    }

    const subtotalPedido = totalCarrinho;
    const taxaEntrega = 6.5;
    const totalPedido = subtotalPedido + taxaEntrega;

    const novoPedido = {
      numero: Math.floor(Math.random() * 9000) + 1000,
      produtos: carrinho,
      subtotal: subtotalPedido,
      taxaEntrega,
      total: totalPedido,
    
      endereco: dadosEntrega.endereco || "Rua da Entrega",
      numeroEndereco: dadosEntrega.numeroEndereco || "S/N",
      formaPagamento: dadosEntrega.formaPagamento || "Dinheiro",
    
      status: "Pedido Recebido",
    
      criadoEm: Date.now(),
      prioridade: "Normal",
    };

    setPedidos((prev) => [...prev, novoPedido]);

    setToastMensagem(
      "Pedido confirmado! Acompanhe o status agora."
    );

    limparCarrinho();

    navigate("/pedido");
  }

  // =========================
  // DADOS COMPARTILHADOS
  // =========================

  function atualizarStatusPedido(numeroPedido, novoStatus) {
    setPedidos((prev) =>
      prev.map((pedido) =>
        pedido.numero === numeroPedido
          ? {
              ...pedido,
              status: novoStatus,
            }
          : pedido
      )
    );
  }
  
  function adicionarPedido(pedido) {
    setPedidos((prev) => [
        ...prev,
        pedido
    ]);
}

  const dadosApp = {
    produtos,
    funcionarios,

    carrinho,
    pedidos,

    quantidadeCarrinho,
    totalCarrinho,

    adicionarCarrinho,
    limparCarrinho,
    removerItem,
    aumentarQuantidade,
    diminuirQuantidade,
    finalizarCompra,

    atualizarStatusPedido,

    setToastMensagem,
  };

  return (
    <>
      <Toast
        message={toastMensagem}
        visible={Boolean(toastMensagem)}
        onClose={() => setToastMensagem("")}
      />
  
      {location.pathname === "/cozinha" ? (
        <Outlet context={dadosApp} />
      ) : (
        <Layout quantidadeCarrinho={quantidadeCarrinho}>
          <Outlet context={dadosApp} />
        </Layout>
      )}
    </>
  );
}

// =========================
// TELA DO CARDÁPIO
// =========================

function Cardapio() {
  const {
    produtos,
    funcionarios,
    adicionarCarrinho,
  } = useOutletContext();

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState("Todos");

  const [busca, setBusca] = useState("");

  const categorias = useMemo(
    () => [
      "Todos",
      ...new Set(produtos.map((produto) => produto.categoria)),
    ],
    [produtos]
  );

  const produtosFiltrados = useMemo(() => {
    const textoBusca = busca.trim().toLowerCase();

    return produtos.filter((produto) => {
      const categoriaOk =
        categoriaSelecionada === "Todos" ||
        produto.categoria === categoriaSelecionada;

      const buscaOk =
        textoBusca === "" ||
        produto.nome.toLowerCase().includes(textoBusca);

      return categoriaOk && buscaOk;
    });
  }, [busca, categoriaSelecionada, produtos]);

  return (
    <div className="conteudo-principal">
      <main className="coluna-esquerda">
        <div className="produtos-container">
          <h2 className="titulo-cardapio">
            Cardápio
          </h2>

          <div className="toolbar-cardapio">
            <input
              type="text"
              className="campo-busca"
              placeholder="Buscar produto..."
              value={busca}
              onChange={(event) =>
                setBusca(event.target.value)
              }
            />

            <div className="filtros-cardapio">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  className={
                    categoriaSelecionada === categoria
                      ? "filtro ativo"
                      : "filtro"
                  }
                  onClick={() =>
                    setCategoriaSelecionada(categoria)
                  }
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="produtos-cards-wrapper">
            {produtosFiltrados.length === 0 ? (
              <div className="sem-produtos">
                <p>
                  Nenhum produto encontrado para essa busca.
                </p>
              </div>
            ) : (
              produtosFiltrados.map((produto) => (
                <CardProduto
                  key={produto.id}
                  nome={produto.nome}
                  preco={produto.preco}
                  categoria={produto.categoria}
                  descricao={produto.descricao}
                  imagem={produto.imagem}
                  adicionarCarrinho={adicionarCarrinho}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <aside className="coluna-direita">
        <div className="funcionarios-container">
          <h2 className="titulo-funcionarios">
            Funcionários
          </h2>

          <div className="funcionarios-cards-wrapper">
            {funcionarios.map((funcionario) => (
              <Funcionario
                key={funcionario.id}
                nome={funcionario.nome}
                cargo={funcionario.cargo}
                fotoUrl={funcionario.fotoUrl}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export { Cardapio };

export default Home;