import React from 'react';
import { Route, Switch } from 'react-router-dom';

const CrearCursos = React.lazy(()=>import('./crearCursos'));

const VerCursos = React.lazy(()=>import('./verCursos'));

const Notas = React.lazy(()=>import('./notas'));

const Course = ({ match, nameToken }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}/crear`}
            render={props=> <CrearCursos {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/ver`}
            render={props=> <VerCursos {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/ver/notas/:curso_numero`}
            render={props=> <Notas {...props} nameToken={nameToken}/>}
        />
    </Switch>
)

export default Course;