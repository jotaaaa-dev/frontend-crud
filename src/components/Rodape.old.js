import React from 'react'
import Navbar from 'react-bootstrap/Navbar'

import { BiGame } from "react-icons/bi";

const Rodape = () => {
    return (
<Navbar bg="dark" fixed="bottom" className="justify-content-center">
    <Navbar.Brand href="#inicio" className="text-light">
        <center>
        <BiGame/> Wonderfull Games <BiGame/>
        <p>Todos os direitos reservados &copy;</p>
        </center>
    </Navbar.Brand>
</Navbar>
    )
}

export default Rodape