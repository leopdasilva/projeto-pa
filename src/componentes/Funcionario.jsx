import './Funcionario.css'

function Funcionario(props) {
    return (
      <>
        <div className="funcionario-card">
          <img src={props.fotoUrl} alt={`Foto de ${props.nome}`} className="funcionario-foto"/>
          <div className="funcionario-info">
            <h3>{props.nome}</h3>
            <p>{props.cargo}</p>
          </div>
        </div>  
      </>
      
    )
  }
  
  export default Funcionario;