import './modal.css'
import { FiX } from 'react-icons/fi'

export default function Modal({ conteudo, close }) {
    return (
        <div className='modal'>
            <div className='container'>
                <button className='btn-close' onClick={close}>
                    <FiX size={25} color='#FFF' />
                    Fechar
                </button>

                <main>
                    <h2>Detalhes do Atendimento</h2>

                    <div className='row'>
                        <span>
                            Cliente: <i>{conteudo.cliente}</i>
                        </span>
                        <span>
                            Mecânico: <i>{conteudo.mecanico}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Automovel: <i>{conteudo.automovel}</i>
                        </span>
                        <span>
                            Ano: <i>{conteudo.ano}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Entrada: <i>{conteudo.createdFormat}</i>
                        </span>
                        <span>
                            Orçamento: <i>{conteudo.orcamento}</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Status: <i className='status-badge' style={{
                                color: '#FFF',
                                backgroundColor: conteudo.status === 'Aberto' ? '#5CB85C'
                                    : conteudo.status === 'Fechado' ? '#D9534F'
                                    : '#999'
                            }}>{conteudo.status}</i>
                        </span>
                    </div>

                    {conteudo.complemento !== '' && (
                        <>
                            <h3>Complemento</h3>
                            <p>{conteudo.complemento}</p>
                        </>
                    )}

                </main>
            </div>
        </div>
    )
}