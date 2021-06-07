import React from 'react'

import { Navbar, Nav, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'

import { BiGame, BiJoystick, BiSpa, BiHome, BiPhone } from "react-icons/bi";

const Cabecalho = () => {

    return (
<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#inicio"><BiGame/> Wonderfull Games</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#inicio"><BiHome/> Início</Nav.Link>
      <Nav.Link href="#contato"><BiPhone/> Contato</Nav.Link>
      <DropdownButton
        variant="dark" 
        as={ButtonGroup}
        menuAlign={{ lg: 'right'}}
        title="Cadastros"
        id="cadastros">
            <Dropdown.Item eventKey="1" href="#/categorias"><BiJoystick/> Jogos</Dropdown.Item>
            <Dropdown.Item eventKey="2"><BiSpa/> Plataformas</Dropdown.Item>
        </DropdownButton>
    </Nav>
  </Navbar>
    )
}

export default Cabecalho