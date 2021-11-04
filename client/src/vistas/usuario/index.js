import React, {Suspene} from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = React.lazy(()=> import('./login'));

const ForgotPass = React.lazy(()=>import('./forgotPassword'));

const Ususario = ({ match }) => {
    return(
        <Switch>
            <Route 
                path={`${match.url}`}
                render={props=> <Login {...props} />}
                exact
            />
            <Route 
                path={`/user/forgotPassword`}
                render={props=> <ForgotPass {...props} />}
                exact
            />
        </Switch>
    )
}

export default Ususario;