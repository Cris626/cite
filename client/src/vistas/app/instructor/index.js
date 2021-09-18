import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Instructores = React.lazy(()=>import('./instructores'));

const Registrar = React.lazy(()=>import('./registrar'));

const Cursos = React.lazy(()=>import('./cursos'));

const Materias = React.lazy(()=>import('./materias'));

const Calificacion = React.lazy(()=>import('./calificacion'));

const Editar = React.lazy(()=>import('./editar'));

const Instructor = ({match, nameToken}) => (
    <Switch>
        <Route
            exact
            path={`${match.url}`}
            render={props=> <Instructores {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/crear`}
            render={props=> <Registrar {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/cursos`}
            render={props=> <Cursos {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/cursos/materias/:name`}
            render={props=> <Materias {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/cursos/materia`}
            render={props=> <Calificacion {...props} nameToken={nameToken}/>}
        />
        <Route
            exact
            path={`${match.url}/edit/:name`}
            render={props=> <Editar {...props} nameToken={nameToken}/>}
        />
    </Switch>
)

export default Instructor;