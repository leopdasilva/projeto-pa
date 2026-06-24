import './Card-prod.css'

function CardProduto(props) { 
    return (
        <>
            <div className='produto-card'> 
                <img src={props.imagem} alt={props.nome} className="produto-imagem" />
                <h3>{props.nome}</h3>
                <p>R$ {props.preco}</p>
                <p className='descricao'>{props.descricao}</p>
            </div>
        </>   
    )
}

export default CardProduto