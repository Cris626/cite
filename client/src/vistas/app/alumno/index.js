import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Postulantes = React.lazy(()=>import('./postulantes'));

const Alumnos = ({match}) => (
    <Switch>
        <Route
            path={`${match.url}/postulantes`}
            render={props=> <Postulantes {...props} />}
        />
    </Switch>
)

export default Alumnos;