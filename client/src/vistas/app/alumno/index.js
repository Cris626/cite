import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Postulantes = React.lazy(()=>import('./postulantes'));

const RegistrarAlumno = React.lazy(()=>import('./registrar'));

const Alumnos = ({match}) => (
    <Switch>
        <Route
            path={`${match.url}/postulantes`}
            render={props=> <Postulantes {...props} />}
        />

        <Route
            path={`${match.url}/registrar-alumno`}
            render={props=> <RegistrarAlumno {...props} />}
        />
    </Switch>
)

export default Alumnos;