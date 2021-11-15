import React, {Suspene} from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = React.lazy(()=> import('./login'));

const ForgotPass = React.lazy(()=>import('./forgotPassword'));

const SendCode = React.lazy(()=>import('./sendCode'));

const NewPassword = React.lazy(()=>import('./newPassworrd'));

const Ususario = ({ match }) => {
    return(
        <Switch>
            <Route
                path={`/user/forgotPassword/:correo/sendCode`}
                render={props=><SendCode {...props}/>}
                exact
            />
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
            <Route
                path={`/user/forgotPassword/:code/:id`}
                render={props=> <NewPassword {...props}/>}
                exact
            />
        </Switch>
    )
}

export default Ususario;