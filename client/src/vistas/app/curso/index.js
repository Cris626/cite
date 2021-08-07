import React from 'react';
import { Route, Switch } from 'react-router-dom';

const CrearCursos = React.lazy(()=>import('./crearCursos'));

const VerCursos = React.lazy(()=>import('./verCursos'));

const Course = ({ match }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}/crear`}
            render={props=> <CrearCursos {...props} />}
        />
        <Route
            exact
            path={`${match.url}/ver`}
            render={props=> <VerCursos {...props} />}
        />
    </Switch>
)

export default Course;