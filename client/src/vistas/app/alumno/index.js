import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Postulantes = React.lazy(()=>import('./postulantes'));

const RegistrarAlumno = React.lazy(()=>import('./registrar'));

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
    </Switch>
)

export default Alumnos;