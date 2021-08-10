import React, { Component, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SideBar from '../../components/sideBar/SideBar';
import navigation from '../../_nav';

const jwt = require('jsonwebtoken');
let token = localStorage.getItem('Authorization');

function authtoken(){
    let jwToken = jwt.verify(token, 'keyPassword', (err, decoded)=>{
        if(err){
            return err;
        }else{
            return decoded.data.nombre;
        }
    });
    return jwToken;
}

const Main = React.lazy(()=> import('./main'));

const Cursos = React.lazy(()=>import('./curso'));

const Materias = React.lazy(()=>import('./materia'));

const Instructores = React.lazy(()=>import('./instructor'));

const Alumnos = React.lazy(()=>import('./alumno'));

const App = props => {
    const {match} = props;
    return(
        <div className="container-main-app">
            <div className="dashboard-wrapper">
                <div className="container-navigation">
                    <div className="nav-bar">
                        <SideBar items={navigation} history={props.history} />
                    </div>
                </div>
            </div>
            <div className="container-app">
                <Switch>
                    <Route
                        path={`${match.url}/main`}
                        render={props=> <Main {...props}/>}
                    />
                    <Route
                        path={`${match.url}/cursos`}
                        render={props=> <Cursos {...props}/>}
                    />
                    <Route
                        path={`${match.url}/materias`}
                        render={props=> <Materias {...props}/>}
                    />
                    <Route
                        path={`${match.url}/instructores`}
                        render={props=> <Instructores {...props} />}
                    />
                    <Route
                        path={`${match.url}/alumnos`}
                        render={props=> <Alumnos {...props} />}
                    />
                </Switch>
            </div>
        </div>
    )
}

export default App;