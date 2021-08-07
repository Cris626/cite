import React from 'react';
import { Route, Switch } from 'react-router-dom';

const VerCurso = React.lazy(()=>import('./verCurso'));

const Materia = ({ match }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}`}
            render={props=> <VerCurso {...props} />}
        />
    </Switch>
)

export default Materia;