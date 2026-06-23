import './Login.css'

function Login({login}) { 
    return(
        <div className='login'> 
            <h2>{login}</h2>
            <input type="text" name="usuario" id="id_usuario" placeholder='Usuário'/>
            <input type="password" name="senha" id="id_senha" placeholder='Senha'/>
            <button id='bt_enviar'>Entrar</button>
        </div>
    )
}

export default Login
