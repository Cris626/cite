import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const jwt = require('jsonwebtoken');
let token = localStorage.getItem('Authorization');

function authtoken(){
    let jwToken = jwt.verify(token, 'keyPassword', (err, decoded)=>{
        if(err){
            return err;
        }else{
            return decoded.data.rol;
        }
    });
    return jwToken;
}

const Main = React.lazy(()=> import('./main'));


const App = props => {
    const {match} = props;
    return(
        <div className="container-main-app">
            <div className="dashboard-wrapper">
                <div className="container-navigation">
                    <div className="nav-bar">
                    </div>
                </div>
            </div>
            <div className="container-app">
                <Switch>
                    <Route
                        path={`${match.url}`}
                        render={props=> <Main {...props} />}
                    />
                </Switch>

            </div>
        </div>
    )
}

export default App;