import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Postulantes = React.lazy(()=>import('./postulantes'));

const RegistrarAlumno = React.lazy(()=>import('./registrar'));

const VerCursos = React.lazy(()=>import('./verCursos'));

const VerAlumnos = React.lazy(()=>import('./alumnos'));

const Alumnos = ({match, nameToken}) => (
    <Switch>
        <Route
            path={`${match.url}/postulantes`}
            render={props=> <Postulantes {...props} nameToken={nameToken}/>}
        />

        <Route
            path={`${match.url}/registrar-alumno`}
            render={props=> <RegistrarAlumno {...props} nameToken={nameToken}/>}
        />
        <Route
            path={`${match.url}/ver-cursos`}
            render={props=> <VerCursos {...props} nameToken={nameToken}/>}
        />
        <Route
            path={`${match.url}/ver-alumnos/:curso`}
            render={props=> <VerAlumnos {...props} nameToken={nameToken} />}
        />
    </Switch>
)

export default Alumnos;