import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import './dashboard.css'

const listRef = collection(db, "Services")

export default function Dashboard() {
    const { logout } = useContext(AuthContext)

    const [services, setServices] = useState([]) //salvar nossa lista de atendimentos
    const [loading, setLoading] = useState(true)
    const [isEmpty, setIsEmpty] = useState(false)

    useEffect(() => {
        async function loadServices(){
            const q = query(listRef, orderBy('created', 'desc'), limit(5)) //parametros para busca no banco de dados, por ordem descrecente de criação do doc.
            const querySnapshot = await getDocs(q) // faz a busca no banco com base na query acima
            await updateState(querySnapshot) // chamar função para listar os documentos

            setLoading(false)
        }

        loadServices()

        return () => { }
    }, [])


    async function updateState(querySnapshot){   //função responsável por tratar a lista de documentos encontrados com base nos paramêtros da query
        const isCollectionEmpty = querySnapshot.size === 0;

        if(!isCollectionEmpty){
            let lista = []

            querySnapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    ano: doc.data().ano,
                    automovel: doc.data().automovel,
                    cliente: doc.data().cliente,
                    complemento: doc.data().complemento,
                    created: doc.data().created,
                    mecanico: doc.data().mecanico,
                    orcamento: doc.data().orcamento,
                    status: doc.data().status
                })
            })

            setServices(...services, ...lista ) // adicionar a nossa lista que está sendo renderizada na tela, os novos atendimentos encontrados
        }else{
            setIsEmpty(true)
        }
    } 

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageSquare size={25} />
                </Title>

                <>


                    {services.length === 0 ? (
                        <div className='container dashboard'>
                            <span>Nenhum chamado encontrado...</span>
                            <Link to="/new" className='new'>
                                <FiPlus color='FFF' size={25} />
                                Novo Atendimento
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to="/new" className='new'>
                                <FiPlus color="#FFF" size={25} />
                                Novo Atendimento
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
                                            <span className='badge' style={{ background: '#999' }}>
                                                Em aberto
                                            </span>
                                        </td>
                                        <td data-label="#">
                                            <button className='action'>
                                                <FiSearch color='#FFF' size={17} style={{ backgroundColor: '#3583f6' }} />
                                            </button>
                                            <button className='action'>
                                                <FiEdit2 color='#FFF' size={17} style={{ backgroundColor: '#F6A935' }} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </>

                    )}


                </>
            </div>

        </div>


    )
}