import Pagina from '@/components/Pagina'
import axios from 'axios'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillTrash3Fill, BsPencilFill } from 'react-icons/bs'

const index = () => {

    const [semestres, setsemestres] = useState([])

    useEffect(() => {
        getAll()
    }, [])

    function getAll() {
        axios.get('/api/semestres').then(resultado => {
            setsemestres(resultado.data);
        })
    }

    function excluir(id) {
        if (confirm('Deseja realmente excluir o registro?')) {
            axios.delete('/api/semestres/' + id)
            getAll()
        }
    }

    return (
        <Pagina titulo="semestres">

            <Link href="/semestres/form" className='mb-2 btn btn-primary'>
                Novo
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data de Inicio</th>
                        <th>Data de Fim </th>
                   
                    </tr>
                </thead>
                <tbody>
                    {semestres.map(item => (
                        <tr key={item.id}>
                            <td>
                                <Link href={'/semestres/' + item.id}>
                                    <BsPencilFill title="Alterar" className='text-primary' />
                                </Link>
                                {' '}
                                <BsFillTrash3Fill title="Excluir" onClick={() => excluir(item.id)} className='text-danger' />
                            </td>
                            <td>{item.nome}</td>
                            <td>{item.datai}</td>
                            <td>{item.dataf}</td>
                      
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Pagina>
    )
}

export default index