import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Inicio from '../pages/Inicio'
import Categorias from '../pages/Categorias'
import Contato from '../pages/Contato'

export default function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/inicio" component={Inicio} />
                <Route exact path="/contato" component={Contato} />
                <Route exact path="/categorias" component={Categorias} />
            </Switch>
        </HashRouter>
    )
}