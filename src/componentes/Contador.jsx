import { useState } from 'react';
import './Contador.css'

function Contador() { 
    const [contador, setContador] = useState(0)
    return (
        <div className='contador-container'>
            <h1>{contador}</h1>
            
            <div className="contador-botoes">
                <button className="btn-adicionar" onClick={() => setContador(contador + 1)}>Adicionar</button>
                <button className="btn-limpar" onClick={() => setContador(0)}>Limpar</button>
                <button className="btn-subtrair" onClick={() => setContador(contador - 1)}>Subtrair</button>
            </div>
        </div>
    )
}

export default Contador;