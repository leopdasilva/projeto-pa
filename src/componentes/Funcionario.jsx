import "./Funcionario.css";

function Funcionario({ nome, cargo, fotoUrl }) {

    return (

        <div className="funcionario-card">

            <img
                src={fotoUrl}
                alt={nome}
                className="funcionario-foto"
            />

            <div className="funcionario-info">

                <h3>{nome}</h3>

                <span className="cargo">
                    {cargo}
                </span>

            </div>

        </div>

    );

}

export default Funcionario;