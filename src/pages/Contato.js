import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Contato = () => {

    useEffect(() => {
        document.title = 'iComida'
    }, [])

    return (
        <>
            <Container fluid className="p-0">
                <Cabecalho />
                <Jumbotron>
                    <h1>Ligue para nós!</h1>
                </Jumbotron>
                <Rodape />
            </Container>
        </>
    )
}

export default Contato