import '../../assets/commons.css'
import '../../assets/home.css';
import ia from '../../assets/images/ia.png'
import heartbeat from '../../assets/images/heartbeat.png'

export default function Result() {
    return (
        <div className='inner_page'>
            <h1 className='title'>Home</h1>
            <div className='section'>
                <div className='text_section'>
                    Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e administrativas exigidas.Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e administrativas exigidas.Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e administ 
                </div>
                <div className='image_section'>
                    <img className='image' src={heartbeat} alt="Minha Imagem" />
                </div>
            </div>
            <div className='section'>
                <div className='image_section'>
                    <img className='image' src={ia} alt="Minha Imagem" />
                </div>
                <div className='text_section'>
                    Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e administrativas exigidas.Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e administrativas exigidas.Acima de tudo, é fundamental ressaltar que a constante divulgação das informações agrega valor ao estabelecimento das condições financeiras e a
                </div>

            </div>
        </div>
    );
}

