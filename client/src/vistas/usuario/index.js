import React, {Suspene} from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = React.lazy(()=> import('./login'));

const Ususario = ({ match }) => {
    return(
        <Switch>
            <Route 
                path={`${match.url}`}
                render={props=> <Login {...props} />}
            />
        </Switch>
    )
}

export default Ususario;