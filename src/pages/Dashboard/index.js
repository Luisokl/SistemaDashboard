import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header'
import Title from '../../components/Title'

import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'

import { Link } from 'react-router-dom'

import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'

import { format } from 'date-fns'

import './dashboard.css'

const listRef = collection(db, "Services")

export default function Dashboard() {
    const { logout } = useContext(AuthContext)

    const [services, setServices] = useState([]) //salvar nossa lista de atendimentos
    const [loading, setLoading] = useState(true) // loading enquanto carrega a lista na interface

    const [isEmpty, setIsEmpty] = useState(false) // estado para mostrar quando a lista estiver vazia
    const [lastDocs, setLastDocs] = useState() //salvar o ultimo item apresentado na lista 
    const [loadingMore, setLoadingMore] = useState(false) //loading enquanto busca por novos doc no banco de dados

    useEffect(() => {
        async function loadServices() {
            const q = query(listRef, orderBy('created', 'desc'), limit(1)) //parametros para busca no banco de dados, por ordem descrecente de criação do doc.
            const querySnapshot = await getDocs(q) // faz a busca no banco com base na query acima
            await updateState(querySnapshot) // chamar função para listar os documentos

            setLoading(false)
        }

        loadServices()

        return () => { }
    }, [])


    async function updateState(querySnapshot) {   //função responsável por tratar a lista de documentos encontrados com base nos paramêtros da query
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty) {
            let lista = []

            querySnapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    ano: doc.data().ano,
                    automovel: doc.data().automovel,
                    cliente: doc.data().cliente,
                    complemento: doc.data().complemento,
                    created: doc.data().created,
                    createdFormat: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    mecanico: doc.data().mecanico,
                    orcamento: doc.data().orcamento,
                    status: doc.data().status
                })
            })

            const lastDocs = querySnapshot.docs[querySnapshot.docs.length -1] // pegando ultimo item da lista

            setServices([...services, ...lista]) // adicionar a nossa lista que está sendo renderizada na tela, os novos atendimentos encontrados
            setLastDocs(lastDocs)

        } else {
            setIsEmpty(true)
        }

        setLoadingMore(false)
    }

    async function handleMore(){
        setLoadingMore(true)

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(1)) //faz uma nova busca no banco apartir do ultimo item
        const querySnapshot = await getDocs(q)
        await updateState(querySnapshot) //chamando a função de listagem 
    }

    if(loading){
        return(
            <div>
                <Header/>

                <div className='content'>
                    <Title name="Atendimentos">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className='container dashboard'>
                        <span>Buscando Atendimentos...</span>
                    </div>
                </div>
            </div>
        )
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
                                    {services.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td data-label="Veiculo">{item.automovel}</td>
                                                <td data-label="Responsavel">{item.mecanico}</td>
                                                <td data-label="Entrada">{item.createdFormat}</td>
                                                <td data-label='Orcamento'>{item.orcamento}</td>
                                                <td data-label="Status">
                                                    <span className='badge' style={{ backgroundColor: item.status === 'Aberto' 
                                                        ? '#5CB85C' 
                                                        : item.status === 'Fechado' ? '#D9534F'
                                                        : '#999' }}>{item.status}
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
                                        )
                                    })}
                                </tbody>
                            </table>

                            {loadingMore && <h3 className='loadingMore'>Buscando mais atendimentos...</h3>}
                            {!loadingMore && !isEmpty && <button className='btn-more' onClick={handleMore}>Bucar mais</button>}
                        </>

                    )}


                </>
            </div>

        </div>


    )
}