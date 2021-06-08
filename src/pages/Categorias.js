import React, { useEffect, useState } from 'react'

import { Container, Row, Col, Spinner, Table, Form, Button, Modal, Toast } from 'react-bootstrap'

import Cabecalho from '../components/Cabecalho'

import { BACKEND } from '../constants'

import { BiPlanet, BiJoystick, BiSave, BiError, BiTrash, BiPencil, BiRename, BiCalendar, BiListUl, BiExtension, BiUpload, BiBuilding, BiWrench } from "react-icons/bi";

<link rel="stylesheet" href="Categorias.css"></link>

const Categorias = () => {
    const valorInicial = { nome: '', data: '', genero: '', plataforma: '', tamanho: '', dev: '', status: true }

    const [categoria, setCategoria] = useState(valorInicial)
    const [categorias, setCategorias] = useState([])
    const [carregandoCategorias, setCarregandoCategorias] = useState(false)
    const [salvandoCategorias, setSalvandoCategorias] = useState(false)
    const [confirmaExclusao, setConfirmaExclusao] = useState(false)

    const [aviso, setAviso] = useState('')
    const [erros, setErros] = useState({})

    const { nome, data, genero, plataforma, tamanho, dev } = categoria

    async function obterCategorias() {
        setCarregandoCategorias(true)
        let url = `${BACKEND}/categorias`
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                setCategorias(data)
                console.log(data)
            })
            .catch(function (error) {
                console.error(`Erro ao obter as categorias: ${error.message}`)
            })
        setCarregandoCategorias(false)

    }

    useEffect(() => {
        document.title = 'Cadastro de Categorias'
        obterCategorias()
    }, [])

    const validaErrosCategoria = () => {
        const novosErros = {}
        //Validação de Nome
        if (!nome || nome === '') novosErros.nome = 'O nome não pode ser vazio!'
        else if (nome.length > 50) novosErros.nome = 'O nome informado é muito longo'
        else if (nome.length < 3) novosErros.nome = 'O nome informado é muito curto'
        if (!data || data === '') novosErros.data = 'Você precisa informar uma data!'
        else if (data.length > 17) novosErros.data = 'A data informada é muito longa, Tente 10 de DEZ de 1990'
        else if (data.length < 10) novosErros.data = 'A data informada é muito curta, Tente 10 de DEZ de 1990'
        if (!genero || genero === '') novosErros.genero = 'O gênero não pode ser vazio!'
        else if (genero.length > 50) novosErros.genero = 'O genero informado é muito longo'
        else if (genero.length < 2) novosErros.genero = 'O genero informado é muito curto'
        if (!plataforma || plataforma === '') novosErros.plataforma = 'Você precisa informar uma plataforma!'
        else if (plataforma.length > 50) novosErros.plataforma = 'A plataforma informada é muito longa'
        else if (plataforma.length < 2) novosErros.plataforma = 'O plataforma informada é muito curta'
        if (!tamanho || tamanho === '') novosErros.tamanho = 'O tamanho não pode ser vazio!'
        else if (tamanho.length > 5) novosErros.tamanho = 'O tamanho informado é muito longo, Tente 64GB'
        else if (tamanho.length < 1) novosErros.tamanho = 'O tamanho informado é muito curto, Tente 64GB'
        if (!dev || dev === '') novosErros.dev = 'Você precisa informar uma desenvolvedora!'
        else if (dev.length > 50) novosErros.dev = 'A desenvolvedora informada é muito longa'
        else if (dev.length < 2) novosErros.dev = 'A desenvolvedora informada é muito curta'
        return novosErros
    }

    const alteraDadosCategoria = e => {
        setCategoria({ ...categoria, [e.target.name]: e.target.value })
        setErros({})
    }

    async function salvarCategoria(e) {
        e.preventDefault() // evita que a página seja recarregada  
        const novosErros = validaErrosCategoria()
        //Existe algum erro no array?
        if (Object.keys(novosErros).length > 0) {
            //Sim, temos erros!
            setErros(novosErros)
        } else {
            const metodo = categoria.hasOwnProperty('_id') ? 'PUT' : 'POST'
            categoria.status = (categoria.status === true || categoria.status === 'ativo') ? 'ativo' : 'inativo'
            setSalvandoCategorias(true)
            let url = `${BACKEND}/categorias`
            await fetch(url, {
                method: metodo,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoria)
            }).then(response => response.json())
                .then(data => {
                    (data._id || data.message) ? setAviso('Registro salvo com sucesso') : setAviso('')
                    setCategoria(valorInicial) //limpa a tela
                    obterCategorias()
                }).catch(function (error) {
                    console.error(`Erro ao salvar a categoria: ${error.message}`)
                })
            setSalvandoCategorias(false)
        }
    }

    async function excluirCategoria() {
        let url = `${BACKEND}/categorias/${categoria._id}`
        await fetch(url, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                data.message ? setAviso(data.message) : setAviso('')
                setCategoria(valorInicial)
                obterCategorias()
            })
            .catch(function (error) {
                console.error(`Erro ao excluir a categoria: ${error.message}`)
            })
    }

    return (
        <>
            <Container fluid className="p-0">
                <Cabecalho />
                <Row className="text-dark">
                    <Col>
                        <br />
                        <center><h2><BiJoystick /> Categorias de Jogos</h2></center>
                        <br />
                    </Col>
                </Row>

                            {/* Formulário das Categorias */}
                            <h6> <BiPlanet />Cadastro das Categorias</h6>
                            <br/>
                            <Form method="post">
                                    <Row>
                                        <right>
                                        <Col>
                                        <Form.Group controlId="nome">
                                            <Form.Label>Nome do Jogo : </Form.Label>
                                            <Form.Control
                                                name="nome" placeholder="Ex: GTA 5..."
                                                onChange={alteraDadosCategoria}
                                                value={nome}
                                                isInvalid={!!erros.nome}
                                                style={{width:300}}/>
                                            <Form.Control.Feedback type='invalid'>
                                                {erros.nome}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        </right>
                                        {/*////////////////////////*/}
                                        <Col>
                                        <Form.Group controlId="data">
                                        <Form.Label>Data de Lançamento :</Form.Label>
                                        <Form.Control
                                            name="data"
                                            placeholder="Ex: 12 de MAI de 2004"
                                            onChange={alteraDadosCategoria}
                                            value={data}
                                            isInvalid={!!erros.data}
                                            style={{width:300}}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {erros.data}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                        {/*////////////////////////*/}
                                        <Row>
                                        <right>
                                        <Col>
                                        <Form.Group controlId="genero">
                                            <Form.Label>Gênero : </Form.Label>
                                            <Form.Control
                                                name="genero" placeholder="Ex: Sobrevivência..."
                                                onChange={alteraDadosCategoria}
                                                value={genero}
                                                isInvalid={!!erros.genero}
                                                style={{width:300}}/>
                                            <Form.Control.Feedback type='invalid'>
                                                {erros.genero}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        </right>
                                        {/*////////////////////////*/}
                                        <Col>
                                        <Form.Group controlId="plataforma">
                                        <Form.Label>Plataforma :</Form.Label>
                                        <Form.Control
                                            name="plataforma"
                                            placeholder="Ex: Steam..."
                                            onChange={alteraDadosCategoria}
                                            value={plataforma}
                                            isInvalid={!!erros.plataforma}
                                            style={{width:300}}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {erros.plataforma}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                        {/*////////////////////////*/}
                                        <Row>
                                        <right>
                                        <Col>
                                        <Form.Group controlId="tamanho">
                                            <Form.Label>Tamanho(GB) : </Form.Label>
                                            <Form.Control
                                                name="tamanho" placeholder="Ex: 32GB..."
                                                onChange={alteraDadosCategoria}
                                                value={tamanho}
                                                isInvalid={!!erros.tamanho}
                                                style={{width:300}}/>
                                            <Form.Control.Feedback type='invalid'>
                                                {erros.tamanho}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                        </right>
                                        {/*////////////////////////*/}
                                        <Col>
                                        <Form.Group controlId="dev">
                                        <Form.Label>Desenvolvedora :</Form.Label>
                                        <Form.Control
                                            name="dev"
                                            placeholder="Ex: Rockstar Games"
                                            onChange={alteraDadosCategoria}
                                            value={dev}
                                            isInvalid={!!erros.dev}
                                            style={{width:300}}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {erros.dev}
                                        </Form.Control.Feedback>
                                        </Form.Group>
                                        </Col>
                                    </Row>


                                <Form.Group controlId="status"></Form.Group>
                                <Button variant="primary" type="submit" title="Salvar o registro"
                                    onClick={(e) => salvarCategoria(e)}>
                                    {salvandoCategorias
                                        ? <Spinner animation="border" size="sm" />
                                        : <BiSave />
                                    }
                                Salvar
                            </Button>
                            &nbsp;
                            <Button variant="danger" type="button" title="Cancelar"
                                    onClick={() => setCategoria(valorInicial)}>
                                    <BiError /> Cancelar
                            </Button>
                            </Form>
                            <br/>

                {/* FIM DO Formulário das Categorias */}

                <Row>
                    <Col xs={12} lg={12}>

                        {/* Listagem das Categorias */}

                        {carregandoCategorias &&
                            <>
                                <Spinner animation="border" variant="dark" />
                                <p>Aguarde, enquanto as categorias são carregadas...</p>
                            </>
                        }
                        <Table striped bordered hover>
                            <thead>
                                <tr className="bg-info text-dark">
                                    <th><BiRename/> Nome</th>
                                    <th><BiCalendar/> Data de Lançamento</th>
                                    <th><BiListUl/> Gênero</th>
                                    <th><BiExtension/> Plataforma</th>
                                    <th><BiUpload/> Tamanho(GB)</th>
                                    <th><BiBuilding/> Desenvolvedora</th>
                                    <th><BiWrench/> Opções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map(item => (
                                    <tr key={item._id}>
                                        <td>{item.nome}</td>
                                        <td>{item.data}</td>
                                        <td>{item.genero}</td>
                                        <td>{item.plataforma}</td>
                                        <td>{item.tamanho}</td>
                                        <td>{item.dev}</td>
                                        <td>
                                            <Button variant="outline-primary" title="Editar o registro"
                                                onClick={() => setCategoria(item)}>
                                                <BiPencil />
                                            </Button>
                                            &nbsp;
                                            <Button variant="outline-danger" title="Apagar o registro"
                                                onClick={() => {
                                                    setCategoria(item)
                                                    setConfirmaExclusao(true)
                                                }} >
                                                <BiTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-success text-light">
                                    <td colspan="6">Total de Registros:</td>
                                    <td>{categorias.length} registros</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Modal animation={false} show={confirmaExclusao} onHide={() => setConfirmaExclusao(false)}>
                    <Modal.Header>
                        <Modal.Title>Confirmação da Exclusão</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Confirma a exclusão da categoria selecionada?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setConfirmaExclusao(!confirmaExclusao)}>
                            ❌Cancelar
                            </Button>
                        <Button variant="success"
                            onClick={() => {
                                setConfirmaExclusao(!confirmaExclusao)
                                excluirCategoria()
                            }}>
                            ✔️Confirmar
                            </Button>
                    </Modal.Footer>
                </Modal>

                <Toast
                    onClose={() => setAviso('')}
                    show={aviso.length > 0}
                    animation={false}
                    delay={4000}
                    autohide
                    className="bg-success"
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10
                    }}>
                    <Toast.Header>Aviso</Toast.Header>
                    <Toast.Body classname="text-light">{aviso}</Toast.Body>
                </Toast>

            </Container>
        </>
    )
}

export default Categorias