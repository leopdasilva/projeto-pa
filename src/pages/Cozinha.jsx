import "./Cozinha.css";


function Cozinha({ pedidos = [] }) {


return (

<div className="cozinha-container">


<h1>
Painel da Cozinha
</h1>


{
pedidos.length === 0 ?

(

<p>
Nenhum pedido recebido ainda.
</p>

)

:

(

pedidos.map((pedido,index)=>(


<div 
className="pedido-cozinha"
key={index}
>


<h2>
Pedido Nº #{pedido.numero}
</h2>


<p>
Status:
<strong>
{" "}{pedido.status}
</strong>
</p>


<h3>
Produtos:
</h3>


{

pedido.produtos.map((item,i)=>(

<div key={i}>

{item.quantidade}x {item.nome}

</div>

))

}


<h3>

Total:
R$ {pedido.total.toFixed(2).replace(".",",")}

</h3>


</div>


))

)


}


</div>

)

}


export default Cozinha;