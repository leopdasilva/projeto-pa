import CardProduto from "../componentes/Card-prod";
import Funcionario from "../componentes/Funcionario";

import "./Home.css";

function Home({
    produtos,
    funcionarios,
    adicionarCarrinho
}) {

    return (
        <div className="conteudo-principal">
            <main className="coluna-esquerda">
                <div className="produtos-container">

                    <h2 className="titulo-cardapio">
                        Cardápio
                    </h2>

                    <div className="produtos-cards-wrapper">
                        {
                            produtos.map(produto => (
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
                        }
                    </div>
                </div>
            </main>

            <aside className="coluna-direita">

                <div className="funcionarios-container">

                    <h2 className="titulo-funcionarios">
                        Funcionários
                    </h2>

                    <div className="funcionarios-cards-wrapper">


                        {
                            funcionarios.map(funcionario => (

                                <Funcionario

                                    key={funcionario.id}

                                    nome={funcionario.nome}

                                    cargo={funcionario.cargo}

                                    fotoUrl={funcionario.fotoUrl}

                                />

                            ))
                        }

                    </div>
                </div>
            </aside>
        </div>
    );
}


export default Home;