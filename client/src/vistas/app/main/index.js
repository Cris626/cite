import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Form = React.lazy(()=> import('./form'));

const Main = ({ match, nameToken }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}`}
            render={props => <Form {...props} nameToken={nameToken}/>}
        />
    </Switch>
)
export default Main;