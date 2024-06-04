import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { collection, getDocs, getDoc, doc, addDoc } from 'firebase/firestore'

import { toast } from 'react-toastify'

import './new.css'

const listRef = collection(db, 'customers')
// conexão com banco de dados, lista/ coleção de clientes cadastrados.

export default function New(){

    const [search, setSearch] = useState('') // termos passado no campo de pesquisa do cliente
    const [customers, setCustomers] = useState([]) // salvar lista de clientes 
    const [filteredClients, setFilterClients] = useState([]) // salvar lista de clientes filtrados
    const [customerSelected, setCustomerSelected] = useState('') // salvar posição do cliente selecionado no campo Cliente..
    const [car, setCar] = useState('')
    const [carYears, setCarYears] = useState('')
    const [dateRecord, setDateRecord] = useState('')
    const [mechanic, setMechanic] = useState('')
    const [status, setStatus] = useState('Aberto')
    const [budget, setBudget] = useState('')
    const [complement, setComplement] = useState('')
    

    const searchLowerCase = search.toLowerCase()

    useEffect(() => {
        async function listCustomers(){
            const querySnapshot = await getDocs(listRef)
            // faz a busca da coleção (customers) no banco.
            .then((snapshot) => {
                let lista = []

                snapshot.forEach((doc) => {
                    // faz a busca na lista customers
                    lista.push({
                        nomeCliente: doc.data().nomeCliente
                    })
                })
            

                if(snapshot.docs.size === 0){
                    console.log('NENHUM CLIENTE ENCONTRADO!!')
                    return;
                }

                setCustomers(lista)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        listCustomers()
    }, [])

    function handleOptionChange(e){
        setStatus(e.target.value)
    }

    function handleChangeProvider(e){
        setMechanic(e.target.value)
        // salvar mecanico selecionado na lista 
    }

    function handleSearchChange(e){
        const searchValue = e.target.value
        setSearch(searchValue)

        if (searchValue) {
            const filtered = customers.filter((cliente) => 
                cliente.nomeCliente.toLowerCase().includes(searchValue.toLowerCase())
            )
            setFilterClients(filtered)
        } else {
            setFilterClients([])
        }
    }

    function handleClientClick(cliente, index){
        console.log(cliente, index)
        setSearch(cliente.nomeCliente)
        setCustomerSelected(index)
        setFilterClients([])
    }

    async function handleRegister(e){
        e.preventDefault()

        await addDoc(collection(db, 'Services'), {
            created: new Date(),
            cliente: search,
            automovel: car,
            ano: carYears,
            mecanico: mechanic,
            status: status,
            orcamento: budget,
            complemento: complement,
        })
        .then(() => {
            toast.success('Atendimento Registrado!')
            setComplement('')
            setCustomerSelected('')
        })
        .catch((error) => {
            toast.error('Erro ao Registrar!')
            console.log(error)
        })
    }


    return(
        <div>
            <Header/>

            <div className="content">
                <Title name='Cadastrar Atendimento'>
                    <FiPlusCircle size={25}/>
                </Title>
                
                <div className="container">
                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Clientes</label>
                        <input 
                            type='search' 
                            value={search} 
                            placeholder='Buscar clientes' 
                            onChange={handleSearchChange}
                        />

                        {search && filteredClients.length > 0 &&
                            <ul>
                                {filteredClients.map((cliente, index) => {
                                    return(
                                        <li key={index} onClick={() => handleClientClick(cliente, index)}>
                                            <p>{cliente.nomeCliente}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        }

                        <label>Automóvel</label>    
                        <input 
                            type="text"
                            name='veiculo'
                            placeholder='Nome do veiculo'
                            onChange={(e => setCar(e.target.value))}
                        />

                        <label>Ano</label> 
                        <input 
                            type="text"
                            name='ano'
                            placeholder='Ano do veiculo'
                            onChange={(e) => setCarYears(e.target.value)}
                        /> 

                        <label>Mêcanico</label>
                        <select value={mechanic} onChange={handleChangeProvider}>
                            <option value='Mecanico 1'>Mecanico 1</option>
                            <option value='Mecanico 2'>Mecanico 2</option>
                            <option value='Mecanico 3'>Mecanico 3</option>
                            <option value='Mecanico 4'>Mecanico 4</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            <input
                                type="radio" 
                                name='radio' 
                                value='Aberto' 
                                onChange={handleOptionChange}
                                checked={ status === 'Aberto'}
                            />
                            <span>Em aberto</span>

                            <input 
                                type="radio" 
                                name='radio' 
                                value='Progresso' 
                                onChange={handleOptionChange}
                                checked={ status === 'Progresso'}
                            />
                            <span>Progresso</span>

                            <input
                                type="radio" 
                                name='radio' 
                                value='Fechado'
                                onChange={handleOptionChange}
                                checked={ status === 'Fechado'}
                            />
                            <span>Fechado</span>
                        </div>

                        <label>Orçamento</label> 
                        <input 
                            type="text"
                            name='Valor'
                            placeholder='Valor do serviço'
                            onChange={(e) => setBudget(e.target.value)}
                        /> 

                        <label>Descrição do atendimento</label>
                        <textarea 
                            type='text' 
                            placeholder='Descreva o serviço a ser realizado..'
                            value={complement}
                            onChange={ (e) => setComplement(e.target.value)}
                        />

                        <button>Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}