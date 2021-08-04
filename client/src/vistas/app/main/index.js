import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Form = React.lazy(()=> import('./form'));

const Main = ({ match }) => (
    <Switch>
        <Route
            path={`${match.url}`}
            render={props => <Form {...props} />}
        />
    </Switch>
)
export default Main;