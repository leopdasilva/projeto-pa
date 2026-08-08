import { useMemo, useState } from "react";
import CardProduto from "../componentes/Card-prod";
import Funcionario from "../componentes/Funcionario";

import "./Home.css";

function Home({
    produtos,
    funcionarios,
    adicionarCarrinho
}) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
    const [busca, setBusca] = useState("");

    const categorias = useMemo(
        () => ["Todos", ...new Set(produtos.map(produto => produto.categoria))],
        [produtos]
    );

    const produtosFiltrados = useMemo(() => {
        const textoBusca = busca.trim().toLowerCase();

        return produtos.filter(produto => {
            const categoriaOk =
                categoriaSelecionada === "Todos" || produto.categoria === categoriaSelecionada;

            const buscaOk =
                textoBusca === "" || produto.nome.toLowerCase().includes(textoBusca);

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
                            onChange={(event) => setBusca(event.target.value)}
                        />

                        <div className="filtros-cardapio">
                            {categorias.map(categoria => (
                                <button
                                    key={categoria}
                                    type="button"
                                    className={categoriaSelecionada === categoria ? "filtro ativo" : "filtro"}
                                    onClick={() => setCategoriaSelecionada(categoria)}
                                >
                                    {categoria}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="produtos-cards-wrapper">
                        {produtosFiltrados.length === 0 ? (
                            <div className="sem-produtos">
                                <p>Nenhum produto encontrado para essa busca.</p>
                            </div>
                        ) : (
                            produtosFiltrados.map(produto => (
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
    );
}

export default Home;