import { useEffect, useState } from "react";
import "./Pedido.css";

function Pedido({ pedido, limparCarrinho, voltar }) {


    if (!pedido) {

        return (

            <div className="pedido-container">

                <h2>
                    Nenhum pedido encontrado.
                </h2>

            </div>

        );

    }



    const etapas = [
        "Pedido Recebido",
        "Em Preparação",
        "Saiu para Entrega",
        "Pedido Entregue"
    ];



    const [etapaAtual, setEtapaAtual] = useState(0);
    const [entregue, setEntregue] = useState(false);



    useEffect(() => {


        if (etapaAtual < etapas.length - 1) {


            const timer = setTimeout(() => {

                setEtapaAtual(prev => prev + 1);

            }, 8000);



            return () => clearTimeout(timer);


        } 
        
        else {

            setEntregue(true);

        }


    }, [etapaAtual]);



    return (

        <div className="pedido-container">


            <h2 className="titulo-pedido">
                📦 Acompanhe seu Pedido
            </h2>



            <div className="linha-progresso">


                {
                    etapas.map((etapa,index)=>(


                        <div

                            key={index}

                            className={
                                index <= etapaAtual
                                ?
                                "etapa ativa"
                                :
                                "etapa"
                            }

                        >


                            <div className="circulo">

                                {
                                    index < etapaAtual
                                    ?
                                    "✓"
                                    :
                                    index + 1
                                }

                            </div>



                            <p>
                                {etapa}
                            </p>


                        </div>


                    ))

                }


            </div>





            <div className="status-pedido">


                <h3>
                    Status Atual
                </h3>



                <p className="status">

                    {etapas[etapaAtual]}

                </p>


            </div>






            {(etapaAtual === 0 || etapaAtual === 1) && (


                <div className="cozinha">


                    <h2>
                        👨‍🍳 Cozinha Xpress Food
                    </h2>



                    <p>

                        <strong>
                            Pedido Nº:
                        </strong>

                        {" "}
                        #{pedido.numero}

                    </p>




                    <p className="mensagem-cozinha">

                        Seu pedido foi enviado para a cozinha e nossa equipe já está preparando tudo para você.

                    </p>





                    <div className="produtos-cozinha">


                        <h3>
                            Itens do Pedido
                        </h3>



                        {
                            pedido.produtos.map((item,index)=>(


                                <div

                                    className="produto-cozinha"

                                    key={index}

                                >

                                    <span>

                                        {item.quantidade}x {item.nome}

                                    </span>


                                </div>


                            ))
                        }


                    </div>



                </div>


            )}







            {entregue && (


                <div className="recibo">


                    <h2>
                        🧾 Recibo
                    </h2>




                    <p>

                        <strong>
                            Pedido Nº:
                        </strong>

                        {" "}
                        #{pedido.numero}

                    </p>





                    {
                        pedido.produtos.map((item,index)=>(


                            <div

                                className="linha-recibo"

                                key={index}

                            >


                                <span>

                                    {item.nome}

                                </span>



                                <span>

                                    {item.quantidade}x -

                                    {" "}
                                    R$

                                    {" "}

                                    {(item.preco * item.quantidade)
                                    .toFixed(2)
                                    .replace(".",",")}


                                </span>


                            </div>


                        ))

                    }

                    <hr />


                    <h3>
                        Total:
                        {" "}
                        R$
                        {" "}

                        {pedido.total
                        .toFixed(2)
                        .replace(".",",")}
                    </h3>


                    <button

                        onClick={() => {

                            limparCarrinho();

                            voltar();

                        }}

                    >

                        Voltar ao Cardápio


                    </button>


                </div>

            )}

        </div>

    );

}


export default Pedido;