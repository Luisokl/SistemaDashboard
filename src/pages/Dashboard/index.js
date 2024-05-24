import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import './dashboard.css'

export default function Dashboard(){
    const { logout } = useContext(AuthContext)

    async function handleLogout() {
        await logout()
    }

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Atendimentos"> 
                    <FiMessageSquare size={25}/>
                </Title>

                <>
                    <Link to="/new" className='new'>
                        <FiPlus color="#FFF" size={25} />
                        Novo 
                    </Link>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Veículo</th>
                                <th scope='col'>Responsável</th>
                                <th scope='col'>Entrada</th>
                                <th scope='col'>Orçamento</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-label="Veiculo">Corolla</td>
                                <td data-label="Responsavel">Miro</td>
                                <td data-label="Entrada">08/04/2024</td>
                                <td data-label='Orcamento'>R$ 235.00</td>
                                <td data-label="Status">
                                    <span className='badge' style={{ background: '#999'}}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="#">
                                    <button className='action'>
                                        <FiSearch color='#FFF' size={17} style={{ backgroundColor: '#3583f6'}}/>
                                    </button>
                                    <button className='action'>
                                        <FiEdit2 color='#FFF' size={17} style={{ backgroundColor: '#F6A935'}}/>
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td data-label="Veiculo">Honda Civic</td>
                                <td data-label="Responsavel">Endrigo</td>
                                <td data-label="Entrada">08/04/2024</td>
                                <td data-label='Orcamento'>R$ 358.90</td>
                                <td data-label="Status">
                                    <span className='badge' style={{ background: '#999'}}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="#">
                                    <button className='action'>
                                        <FiSearch color='#FFF' size={17} style={{ backgroundColor: '#3583f6'}}/>
                                    </button>
                                    <button className='action'>
                                        <FiEdit2 color='#FFF' size={17} style={{ backgroundColor: '#F6A935'}}/>
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td data-label="Veiculo">Mercedes</td>
                                <td data-label="Responsavel">Endrigo</td>
                                <td data-label="Entrada">08/04/2024</td>
                                <td data-label='Orcamento'>R$ 1250.00</td>
                                <td data-label="Status">
                                    <span className='badge' style={{ background: '#999'}}>
                                        Em aberto
                                    </span>
                                </td>
                                <td data-label="#">
                                    <button className='action'>
                                        <FiSearch color='#FFF' size={17} style={{ backgroundColor: '#3583f6'}}/>
                                    </button>
                                    <button className='action'>
                                        <FiEdit2 color='#FFF' size={17} style={{ backgroundColor: '#F6A935'}}/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            </div>
            
        </div>

        
    )
}