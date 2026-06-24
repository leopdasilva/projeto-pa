import './Header.css'
import logoLanchonete from '../assets/xpress-logo2.png'
import subtitulo from '../assets/subtitulo.png'

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