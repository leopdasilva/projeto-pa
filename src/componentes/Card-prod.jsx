import { useState } from 'react'
import './Card-prod.css'

function CardProduto(props) {

    const [quantidade, setQuantidade] = useState(1)

    function aumentarQuantidade(){
        setQuantidade(quantidade + 1)
    }

    function diminuirQuantidade(){
        if(quantidade > 1){
            setQuantidade(quantidade - 1)
        }
    }

    function adicionarCarrinho(){

        props.adicionarCarrinho(
            props.nome,
            props.preco,
            quantidade
        )

        setQuantidade(1)

    }

    return (
        <div className='produto-card'>

            <img
                src={props.imagem}
                alt={props.nome}
                className="produto-imagem"
            />

            <h3>
                {props.nome}
            </h3>

            <p className="categoria">
                Categoria: {props.categoria}
            </p>

            <p className="preco">
                R$ {props.preco.toFixed(2).replace('.', ',')}
            </p>

            <p className='descricao'>
                {props.descricao}
            </p>

            <div className="controle-quantidade">

                <button onClick={diminuirQuantidade}>
                    -
                </button>

                <span>
                    {quantidade}
                </span>

                <button onClick={aumentarQuantidade}>
                    +
                </button>

            </div>

            <button 
                className="botao-carrinho"
                onClick={adicionarCarrinho}
            >
                Adicionar ao Carrinho
            </button>

        </div>
    )
}

export default CardProduto