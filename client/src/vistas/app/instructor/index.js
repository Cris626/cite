import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Instructores = React.lazy(()=>import('./instructores'));

const Registrar = React.lazy(()=>import('./registrar'));

const Cursos = React.lazy(()=>import('./cursos'));

const Instructor = ({match}) => (
    <Switch>
        <Route
            exact
            path={`${match.url}`}
            render={props=> <Instructores {...props} />}
        />
        <Route
            exact
            path={`${match.url}/crear`}
            render={props=> <Registrar {...props} />}
        />
        <Route
            exact
            path={`${match.url}/cursos`}
            render={props=> <Cursos {...props} />}
        />
    </Switch>
)

export default Instructor;