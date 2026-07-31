import { useState } from "react";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProduto from "./componentes/Card-prod";
import Funcionario from "./componentes/Funcionario";

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

  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(0);
  const [carrinho, setCarrinho] = useState([]);

  function adicionarCarrinho(nome, preco, quantidade) {

    setQuantidadeCarrinho(prev => prev + quantidade);

    setCarrinho(prev => {

      const produtoExistente = prev.find(
        item => item.nome === nome
      );

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

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + (item.preco * item.quantidade),
    0
  );

  return (
    <div className="app-container">

      <Header
        quantidade={quantidadeCarrinho}
        carrinho={carrinho}
        total={totalCarrinho}
        limparCarrinho={limparCarrinho}
      />

      <div className="conteudo-principal">

        <main className="coluna-esquerda">

          <div className="produtos-container">

            <h2 className="titulo-cardapio">
              Cardápio
            </h2>

            <div className="produtos-cards-wrapper">

              {produtos.map(produto => (
                <CardProduto
                  key={produto.id}
                  nome={produto.nome}
                  preco={produto.preco}
                  categoria={produto.categoria}
                  descricao={produto.descricao}
                  imagem={produto.imagem}
                  adicionarCarrinho={adicionarCarrinho}
                />
              ))}

            </div>

          </div>

        </main>

        <aside className="coluna-direita">

          <div className="login-sidebar">
            <Login login="Login" />
          </div>

          <div className="funcionarios-container">

            <h2 className="titulo-funcionarios">
              Funcionários
            </h2>

            <div className="funcionarios-cards-wrapper">

              {funcionarios.map(funcionario => (
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

    </div>
  );
}

export default App;