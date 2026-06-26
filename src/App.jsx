import Header from "./componentes/Header"; 
import Login from "./componentes/Login";
import CardProduto from "./componentes/Card-prod";
import Funcionario from "./componentes/Funcionario";
import Contador from "./componentes/contador";

function App() {
  return (
    <>
      <Header titulo="Lanchonete Xpress" subtitulo="A entrega mais rápida da região"/>
      <Login login="Login"/>

      <div className="produtos-container">
        <h2 className="titulo-cardapio">Cardápio</h2>
        <div className="produtos-cards-wrapper">
          <CardProduto nome="X-Burguer" preco="15,90" descricao="Hambúrguer artesanal grelhado, muito queijo prato derretido e maionese especial da casa no pão brioche selado." imagem="https://images.pexels.com/photos/33673825/pexels-photo-33673825.jpeg"/>
          <CardProduto nome="X-Salada" preco="17,90" descricao="Blend bovino suculento, queijo derretido, alface americana fresca, tomates selecionados e molho artesanal." imagem="https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg"/>
          <CardProduto nome="Refrigerante" preco="6,00" descricao="Lata de 350ml trincando de gelada. Escolha o seu sabor favorito para acompanhar o seu lanche." imagem="https://images.pexels.com/photos/5860659/pexels-photo-5860659.jpeg"/>
        </div>
      </div>

      <div className="funcionarios-container">
          <h2 className="titulo-funcionarios">Funcionários</h2>
          <div className="funcionarios-cards-wrapper">
            <Funcionario nome="Alexandre Gaspari" cargo="Atendente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSvxlMQ0yxOc2hXkochHyY51xkZsBxKFDHw&s"/>
            <Funcionario nome="Cesar Stati" cargo="Gerente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwU2daGPdMx-ZYsHz8DuHeFBi_cqZtpUGF9Q&s"/>
            <Funcionario nome="Donathan Goncalves" cargo="Chef de Cozinha" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxliqPfoR4K-WKT7JoGovyVi794g6FrtKXQ&s"/>
          </div>
      </div>

      <div className="contador-container">
        <h2 className ="titulo-contador">Caixa</h2>
        <div className="contador-cards-wrapper">
          <Contador nome="X-Burguer" preco={15.90}/>
          <Contador nome="X-Salada" preco={17.90}/>
          <Contador nome="Refrigerante" preco={6.00}/>
        </div>
      </div>
      
    </>
  )
}

export default App