import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal() {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='btn-close'>
                    <FiX size={25} color='#FFF' />
                    Fechar
                </button>

                <main>
                    <h2>Detalhes do Atendimento</h2>

                    <div className='row'>
                        <span>
                            Cliente: <i>Fulano</i>
                        </span>
                        <span>
                            Mecânico: <i>Ciclano</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Automovel: <i>Fusion</i>
                        </span>
                        <span>
                            Ano: <i>2037</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Entrada: <i>27/06/2024</i>
                        </span>
                        <span>
                            Orçamento: <i>1.500,00</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Status: <i>Aberto</i>
                        </span>
                    </div>

                    <>
                        <h3>Complemento</h3>
                        <p> Conteudo do complemento Conteudo do complemento Conteudo do complemento Conteudo do complemento Conteudo do complemento Conteudo do complementoConteudo do complemento Conteudo do complemento Conteudo do complemento vConteudo do complemento Conteudo do complemento</p>
                    </>

                </main>
            </div>
        </div>
    )
}