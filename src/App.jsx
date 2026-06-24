import Header from "./componentes/Header"; 
import Login from "./componentes/Login";
import CardProduto from "./componentes/Card-prod";
import Funcionario from "./componentes/Funcionario";

function App() {
  return (
    <>
      <Header titulo="Lanchonete Xpress" subtitulo="A entrega mais rápida da região"/>
      <Login login="Login"/>

      <div className="produtos-container">
        <CardProduto nome="X-Burguer" preco="15,90" descricao="Hambúrguer artesanal grelhado, muito queijo prato derretido e maionese especial da casa no pão brioche selado." imagem="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80"/>
        <CardProduto nome="X-Salada" preco="17,90" descricao="Blend bovino suculento, queijo derretido, alface americana fresca, tomates selecionados e molho artesanal." imagem="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop&q=80"/>
        <CardProduto nome="Refrigerante" preco="6,00" descricao="Lata de 350ml trincando de gelada. Escolha o seu sabor favorito para acompanhar o seu lanche." imagem="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80"/>
      </div>

      
      <div className="funcionarios-container">
          <h2 className="titulo-secao-interna">Funcionários</h2>
          <div className="funcionarios-cards-wrapper">
            <Funcionario nome="Alexandre Gaspari" cargo="Atendente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSvxlMQ0yxOc2hXkochHyY51xkZsBxKFDHw&s"/>
            <Funcionario nome="Cesar Stati" cargo="Gerente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwU2daGPdMx-ZYsHz8DuHeFBi_cqZtpUGF9Q&s"/>
            <Funcionario nome="Donathan Goncalves" cargo="Chef de Cozinha" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxliqPfoR4K-WKT7JoGovyVi794g6FrtKXQ&s"/>
          </div>
      </div>
      
    </>
  )
}

export default App