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
        <CardProduto nome="X-Burguer" preco="15,90"/>
        <CardProduto nome="X-Salada" preco="17,90"/>
        <CardProduto nome="Refrigerante" preco="6,00"/>
      </div>

      <div className="funcionarios-container">
          <Funcionario nome="Alexandre Gaspari" cargo="Atendente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPSvxlMQ0yxOc2hXkochHyY51xkZsBxKFDHw&s"/>
          <Funcionario nome="Cesar Stati" cargo="Gerente" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwU2daGPdMx-ZYsHz8DuHeFBi_cqZtpUGF9Q&s"/>
          <Funcionario nome="Donathan Goncalves" cargo="Chef de Cozinha" fotoUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDxliqPfoR4K-WKT7JoGovyVi794g6FrtKXQ&s"/>
      </div>
      
    </>
  )
}

export default App