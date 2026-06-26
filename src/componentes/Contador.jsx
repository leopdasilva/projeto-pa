import { useState } from 'react';
import './Contador.css';

function Contador({ nome, preco, onPrecoChange }) { 
    const [quantidade, setQuantidade] = useState(0);
    const precoTotal = quantidade * preco;

    return (
        <div className='card-pedido'>
            <h1>{nome}</h1>
            
            <p>Preço: R$ {preco.toFixed(2).replace('.', ',')}</p>
            <p>Quantidade: {quantidade}</p>
            <p>Preço Total: R$ {precoTotal.toFixed(2).replace('.', ',')}</p>
            
            <div className="contador-botoes">
                <button className="btn-adicionar" onClick={() => {setQuantidade(quantidade + 1);onPrecoChange(preco); }}>Adicionar</button><button className="btn-limpar" onClick={() => {onPrecoChange(-precoTotal); setQuantidade(0);}}>Limpar</button>
                <button className="btn-subtrair" onClick={() => { if (quantidade > 0) {setQuantidade(quantidade - 1);onPrecoChange(-preco); }}}>Subtrair</button>
            </div>
        </div>
    );
}

export default Contador;
