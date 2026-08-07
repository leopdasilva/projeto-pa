import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Layout from "./componentes/Layout";
import Cozinha from "./pages/Cozinha";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Carrinho from "./pages/Carrinho";
import Pedido from "./pages/Pedido";

function App() {

  const produtos = [
    {
      id: 1,
      nome: "X-Burguer",
      preco: 15.90,
      categoria: "Hambúrguer",
      descricao: "Hambúrguer artesanal com queijo prato derretido, molho especial da casa e pão brioche levemente tostado.",
      imagem: "/imagens/xburguer.jpg"
    },
    {
      id: 2,
      nome: "X-Salada",
      preco: 17.50,
      categoria: "Hambúrguer",
      descricao: "Hambúrguer artesanal com queijo, alface crocante, tomate fresco e maionese especial no pão brioche.",
      imagem: "/imagens/xsalada.jpg"
    },
    {
      id: 3,
      nome: "Fanta Uva",
      preco: 6.00,
      categoria: "Bebida",
      descricao: "Refrigerante Fanta Uva em lata de 350 ml, servido bem gelado para acompanhar seu lanche.",
      imagem: "/imagens/fantauva.jpg"
    },
    {
      id: 4,
      nome: "Coca-Cola",
      preco: 6.00,
      categoria: "Bebida",
      descricao: "Coca-Cola tradicional em lata de 350 ml, refrescante e perfeita para qualquer refeição.",
      imagem: "/imagens/coca.jpg"
    },
    {
      id: 5,
      nome: "Batata Frita",
      preco: 10.00,
      categoria: "Porção",
      descricao: "Porção de batatas fritas douradas e crocantes, preparadas na hora e levemente temperadas.",
      imagem: "/imagens/batata.jpg"
    },
    {
      id: 6,
      nome: "Milk Shake",
      preco: 12.00,
      categoria: "Sobremesa",
      descricao: "Milk shake cremoso preparado com sorvete e leite, disponível em deliciosos sabores.",
      imagem: "/imagens/milkshake.jpg"
    },
    {
      id: 7,
      nome: "Hot Dog",
      preco: 13.50,
      categoria: "Lanche",
      descricao: "Cachorro-quente com salsicha, molho de tomate, milho, batata palha e maionese especial.",
      imagem: "/imagens/hotdog.jpg"
    },
    {
      id: 8,
      nome: "Suco Natural",
      preco: 8.00,
      categoria: "Bebida",
      descricao: "Suco natural preparado com frutas frescas, sem conservantes e servido gelado.",
      imagem: "/imagens/suco.jpg"
    }
  ];

  const funcionarios = [
    {
      id: 1,
      nome: "Cesar Stati",
      cargo: "CEO",
      fotoUrl: "/imagens/ceo.png"
    },
    {
      id: 2,
      nome: "Donathan Goncalves",
      cargo: "Chef de Cozinha",
      fotoUrl: "/imagens/chef.png"
    },
    {
      id: 3,
      nome: "Alexandre Gaspari",
      cargo: "Atendente",
      fotoUrl: "/imagens/atendente.png"
    }
  ];

  const navigate = useNavigate();
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [carrinho, setCarrinho] = useState([]);
  const [pedidos,setPedidos] = useState([]);

  function adicionarCarrinho(nome, preco, categoria, imagem, quantidade) {

    setQuantidadeCarrinho(prev => prev + quantidade);

    setCarrinho(prev => {

      const produtoExistente = prev.find(item => item.nome === nome);

      if (produtoExistente) {

        return prev.map(item =>
          item.nome === nome
            ? {
                ...item,
                quantidade: item.quantidade + quantidade
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
          quantidade
        }
      ];

    });

    alert(`${quantidade}x ${nome} adicionado ao carrinho`);

  }

  function limparCarrinho() {
    setCarrinho([]);
    setQuantidadeCarrinho(0);
  }

  function finalizarCompra(){

    const novoPedido = {

        numero:
        Math.floor(Math.random() * 9000) + 1000,

        produtos: carrinho,

        total: totalCarrinho,

        status:"Pedido Recebido"

    };


    setPedidos(prev => [
        ...prev,
        novoPedido
    ]);


    navigate("/pedido");

  }


  function removerItem(nome) {

    const itemRemovido = carrinho.find(item => item.nome === nome);

    setCarrinho(prev =>
      prev.filter(item => item.nome !== nome)
    );

    if (itemRemovido) {
      setQuantidadeCarrinho(prev => prev - itemRemovido.quantidade);
    }

  }

  function aumentarQuantidade(nome) {

    setCarrinho(prev =>
      prev.map(item =>
        item.nome === nome
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    );
  
    setQuantidadeCarrinho(prev => prev + 1);
  
  }
  
  function diminuirQuantidade(nome) {

    const item = carrinho.find(item => item.nome === nome);
  
    if (!item || item.quantidade === 1) return;
  
    setCarrinho(prev =>
      prev.map(item =>
        item.nome === nome
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    );
  
    setQuantidadeCarrinho(prev => prev - 1);
  
  }

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (

    <Routes>

    {/* LOGIN */}
    <Route
        path="/"
        element={<Login />}
    />


    {/* ÁREA DO CLIENTE */}
    <Route
        element={
            <Layout
                quantidadeCarrinho={quantidadeCarrinho}
            />
        }
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


    {/* ÁREA DA COZINHA */}
    <Route
      path="/cozinha"
      element={
          <Cozinha
              pedidos={pedidos}
          />
      }
    />


</Routes>

);
}

export default App;