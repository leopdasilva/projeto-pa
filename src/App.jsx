import { useState } from 'react';
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import CardProduto from "./componentes/Card-prod";
import Funcionario from "./componentes/Funcionario";
import Contador from "./componentes/contador";

function App() {
  const lanches = [
    { id: 1, nome: "X-Burguer", preco: 15.90, descricao: "Hambúrguer artesanal grelhado, muito queijo prato derretido e maionese especial da casa no pão brioche selado.", imagem: "https://images.pexels.com/photos/33673825/pexels-photo-33673825.jpeg" },
    { id: 2, nome: "X-Salada", preco: 17.50, descricao: "Blend bovino suculento, queijo derretido, alface americana fresca, tomates selecionados e molho artesanal.", imagem: "https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg" },
    { id: 3, nome: "Refrigerante", preco: 6.00, descricao: "Lata de 350ml trincando de gelada. Escolha o seu sabor favorito para acompanhar o seu lanche.", imagem: "https://images.pexels.com/photos/5860659/pexels-photo-5860659.jpeg" }
  ];

  const funcionarios = [
    { id: 1, nome: "Cesar Stati", cargo: "Gerente", fotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwU2daGPdMx-ZYsHz8DuHeFBi_cqZtpUGF9Q&s" },
    { id: 2, nome: "Donathan Goncalves", cargo: "Chef de Cozinha", fotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxliqPfoR4K-WKT7JoGovyVi794g6FrtKXQ&s" },
    { id: 3, nome: "Alexandre Gaspari", cargo: "Atendente", fotoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSvxlMQ0yxOc2hXkochHyY51xkZsBxKFDHw&s" }
  ];


  // O estado para acumular o valor total de tudo
  const [totalGeral, setTotalGeral] = useState(0);

  // Função simples que soma ou subtrai os valores enviados pelos cards
  const atualizarTotalGeral = (valor) => {
    setTotalGeral((prev) => prev + valor);
  };

  return (
    <div className="app-container">
      {/*Header com imagens para logo e subtitulo*/}
      <Header />

      {/* Container flex que divide o resto do site em duas partes */}
      <div className="conteudo-principal">

        {/* ================= COLUNA DA ESQUERDA ================= */}
        <main className="coluna-esquerda">

          {/* Container com os cards sobre os produtos */}
          <div className="produtos-container">
            <h2 className="titulo-cardapio">Cardápio</h2>
            <div className="produtos-cards-wrapper">

              {lanches.map(lanche => {
                return (
                  <CardProduto
                    key={lanche.id}
                    nome={lanche.nome}
                    preco={lanche.preco.toFixed(2).replace('.', ',')}
                    descricao={lanche.descricao}
                    imagem={lanche.imagem}
                  />
                );
              })}

            </div>
          </div>

          {/* Container com os cards sobre o caixa e o valor total */}
          <div className="contador-container">
            <h2 className="titulo-contador">Caixa</h2>
            <div className="contador-cards-wrapper">

              {lanches.map(lanche => {
                return (
                  <Contador
                    key={lanche.id}
                    nome={lanche.nome}
                    preco={lanche.preco}
                    onPrecoChange={atualizarTotalGeral}
                  />
                );
              })}

            </div>

            <div className="total-geral-caixa">
              <h3>Total do Pedido: R$ {totalGeral.toFixed(2).replace('.', ',')}</h3>
            </div>
          </div>

        </main>

        {/* ================= COLUNA DA DIREITA ================= */}
        <aside className="coluna-direita">

          {/* Caixa de Login no topo da coluna da direita */}
          <div className="login-sidebar">
            <Login login="Login" />
          </div>

          {/* Container com os cards sobre os funcionários logo abaixo do Login */}
          <div className="funcionarios-container">
            <h2 className="titulo-funcionarios">Funcionários</h2>
            <div className="funcionarios-cards-wrapper">

              {funcionarios.map(funcionario => {
                return (
                  <Funcionario
                    key={funcionario.id}
                    nome={funcionario.nome}
                    cargo={funcionario.cargo}
                    fotoUrl={funcionario.fotoUrl}
                  />
                );
              })}

            </div>
          </div>


        </aside>

      </div>
    </div>
  )
}

export default App;