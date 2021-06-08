import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import Cabecalho from '../components/Cabecalho'
import Rodape from '../components/Rodape'

const Inicio = () => {

    useEffect(() => {
        document.title = 'Wonderfull Games | Site Oficial'
    }, [])

    return (
        <>
            <Container fluid className="p-0">
                <Cabecalho />
                <Jumbotron>
                    <h1>Seja Bem Vindo!</h1>
                    <p>Área administrativa do Wonderfull Games.<br/>
                       Somos a primeira empresa de games do Brasil
                    </p>
                </Jumbotron>
            </Container>
            <Rodape />
        </>
    )
}

export default Inicio