import './Card-prod.css'

function CardProduto(props) { 
    return (
        <div className='produto-card'> 
            <h3>{props.nome}</h3>
            <p>R$ {props.preco}</p>
        </div>
    )
}

export default CardProduto