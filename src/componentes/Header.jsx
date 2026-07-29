import './Header.css'
import logoLanchonete from '../../public/imagens/xpress-logo2.png'
import subtitulo from '../../public/imagens/subtitulo.png'

function Header() {
    return(
        <>
            <div className="titulo">  
                <img src={logoLanchonete} alt="Logo Lanchonete Xpress" className="header-logo"/>
                <img src={subtitulo} alt="Subtitulo Lanchonete Xpress" className="header-sub"/>  
            </div> 
        </>
        
    )
}

export default Header