import React from 'react';
import { Route, Switch } from 'react-router-dom';

const CrearCurso = React.lazy(()=>import('./crearCurso'));

const Course = ({ match }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}/crear`}
            render={props=> <CrearCurso {...props} />}
        />
    </Switch>
)

export default Course;