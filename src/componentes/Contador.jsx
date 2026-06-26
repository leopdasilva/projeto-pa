import { useState } from 'react';
import './Contador.css';

function Contador({ nome, preco }) { 
    const [quantidade, setQuantidade] = useState(0);
    const precoTotal = quantidade * preco;

    return (
        <div className='card-pedido'>
            <h1>{nome}</h1>
            
            <p>Preço: R$ {preco}</p>
            <p>Quantidade: {quantidade}</p>
            <p>Preço Total: R$ {precoTotal}</p>
            
            <div className="contador-botoes">
                <button className="btn-adicionar" onClick={() => setQuantidade(quantidade + 1)}>Adicionar</button>
                <button className="btn-limpar" onClick={() => setQuantidade(0)}>Limpar</button>
                <button className="btn-subtrair" onClick={() => { if (quantidade > 0)setQuantidade(quantidade - 1) }}>Subtrair</button>
            </div>
        </div>
    );
}

export default Contador;
