import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Layout from "./componentes/Layout";
import Toast from "./componentes/Toast";
import Cozinha from "./pages/Cozinha";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";

function App() {
  // Dados principais do cardápio e equipe exibidos nas páginas do cliente.
  const produtos = [
    {
      id: 1,
      nome: "X-Burguer",
      preco: 15.9,
      categoria: "Hambúrguer",
      descricao: "Hambúrguer artesanal com queijo prato derretido, molho especial da casa e pão brioche levemente tostado.",
      imagem: "/imagens/xburguer.jpg",
    },
    {
      id: 2,
      nome: "X-Salada",
      preco: 17.5,
      categoria: "Hambúrguer",
      descricao: "Hambúrguer artesanal com queijo, alface crocante, tomate fresco e maionese especial no pão brioche.",
      imagem: "/imagens/xsalada.jpg",
    },
    {
      id: 3,
      nome: "Fanta Uva",
      preco: 6,
      categoria: "Bebida",
      descricao: "Refrigerante Fanta Uva em lata de 350 ml, servido bem gelado para acompanhar seu lanche.",
      imagem: "/imagens/fantauva.jpg",
    },
    {
      id: 4,
      nome: "Coca-Cola",
      preco: 6,
      categoria: "Bebida",
      descricao: "Coca-Cola tradicional em lata de 350 ml, refrescante e perfeita para qualquer refeição.",
      imagem: "/imagens/coca.jpg",
    },
    {
      id: 5,
      nome: "Batata Frita",
      preco: 10,
      categoria: "Porção",
      descricao: "Porção de batatas fritas douradas e crocantes, preparadas na hora e levemente temperadas.",
      imagem: "/imagens/batata.jpg",
    },
    {
      id: 6,
      nome: "Milk Shake",
      preco: 12,
      categoria: "Sobremesa",
      descricao: "Milk shake cremoso preparado com sorvete e leite, disponível em deliciosos sabores.",
      imagem: "/imagens/milkshake.jpg",
    },
    {
      id: 7,
      nome: "Hot Dog",
      preco: 13.5,
      categoria: "Lanche",
      descricao: "Cachorro-quente com salsicha, molho de tomate, milho, batata palha e maionese especial.",
      imagem: "/imagens/hotdog.jpg",
    },
    {
      id: 8,
      nome: "Suco Natural",
      preco: 8,
      categoria: "Bebida",
      descricao: "Suco natural preparado com frutas frescas, sem conservantes e servido gelado.",
      imagem: "/imagens/suco.jpg",
    },
  ];

  const funcionarios = [
    { id: 1, nome: "Cesar Stati", cargo: "CEO", fotoUrl: "/imagens/ceo.png" },
    { id: 2, nome: "Donathan Goncalves", cargo: "Chef de Cozinha", fotoUrl: "/imagens/chef.png" },
    { id: 3, nome: "Alexandre Gaspari", cargo: "Atendente", fotoUrl: "/imagens/atendente.png" },
  ];

  const navigate = useNavigate();

  // Estado geral do carrinho e dos pedidos realizados no app.
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [toastMensagem, setToastMensagem] = useState("");

  // Adiciona itens ao carrinho e mostra uma mensagem de confirmação.
  function adicionarCarrinho(nome, preco, categoria, imagem, quantidade) {
    setQuantidadeCarrinho((prev) => prev + quantidade);

    setCarrinho((prev) => {
      const produtoExistente = prev.find((item) => item.nome === nome);

      if (produtoExistente) {
        return prev.map((item) =>
          item.nome === nome
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }

      return [...prev, { nome, preco, categoria, imagem, quantidade }];
    });

    setToastMensagem(`${quantidade}x ${nome} adicionado ao carrinho`);
  }

  // Limpa todo o carrinho e zera a contagem de itens.
  function limparCarrinho() {
    setCarrinho([]);
    setQuantidadeCarrinho(0);
  }

  // Remove um item específico do carrinho.
  function removerItem(nome) {
    const itemRemovido = carrinho.find((item) => item.nome === nome);

    setCarrinho((prev) => prev.filter((item) => item.nome !== nome));

    if (itemRemovido) {
      setQuantidadeCarrinho((prev) => prev - itemRemovido.quantidade);
    }
  }

  // Aumenta a quantidade de um produto já no carrinho.
  function aumentarQuantidade(nome) {
    setCarrinho((prev) =>
      prev.map((item) =>
        item.nome === nome ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );

    setQuantidadeCarrinho((prev) => prev + 1);
  }

  // Diminui a quantidade de um produto do carrinho.
  function diminuirQuantidade(nome) {
    const item = carrinho.find((item) => item.nome === nome);

    if (!item || item.quantidade === 1) return;

    setCarrinho((prev) =>
      prev.map((item) =>
        item.nome === nome ? { ...item, quantidade: item.quantidade - 1 } : item
      )
    );

    setQuantidadeCarrinho((prev) => prev - 1);
  }

  // Calcula o valor total atual do carrinho.
  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  // Cria um novo pedido a partir do carrinho atual e envia para a página de acompanhamento.
  function finalizarCompra(dadosEntrega = {}) {
    if (carrinho.length === 0) {
      setToastMensagem("Seu carrinho está vazio.");
      return;
    }

    const subtotalPedido = totalCarrinho;
    const taxaEntrega = subtotalPedido > 0 ? 6.5 : 0;
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
    };

    setPedidos((prev) => [...prev, novoPedido]);
    setToastMensagem("Pedido confirmado! Acompanhe o status agora.");
    navigate("/pedido");
  }

  return (
    <>
      <Toast
        message={toastMensagem}
        visible={Boolean(toastMensagem)}
        onClose={() => setToastMensagem("")}
      />

      <Routes>
        {/* Tela de login inicial do sistema. */}
        <Route path="/" element={<Login />} />

        {/* Área do cliente com header e navegação compartilhada. */}
        <Route
          element={<Layout quantidadeCarrinho={quantidadeCarrinho} />}
        >
          <Route
            path="/home"
            element={
              <Home
                produtos={produtos}
                funcionarios={funcionarios}
                adicionarCarrinho={adicionarCarrinho}
              />
            }
          />

          <Route
            path="/carrinho"
            element={
              <Carrinho
                carrinho={carrinho}
                total={totalCarrinho}
                limparCarrinho={limparCarrinho}
                finalizarCompra={finalizarCompra}
                removerItem={removerItem}
                aumentarQuantidade={aumentarQuantidade}
                diminuirQuantidade={diminuirQuantidade}
              />
            }
          />

          <Route
            path="/pedido"
            element={
              <Pedido
                pedido={pedidos[pedidos.length - 1]}
                limparCarrinho={limparCarrinho}
                voltar={() => navigate("/home")}
              />
            }
          />
        </Route>

        {/* Painel interno da cozinha com controle dos pedidos. */}
        <Route path="/cozinha" element={<Cozinha pedidos={pedidos} />} />
      </Routes>
    </>
  );
}

export default App;