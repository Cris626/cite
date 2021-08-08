import React from 'react';
import { Route, Switch } from 'react-router-dom';

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

let oficial = {
    apellido: authtoken()
};

const VerCurso = React.lazy(()=>import('./verCurso'));

const Materia = ({ match }) => (
    <Switch>
        <Route
            exact
            path={`${match.url}`}
            render={props=> <VerCurso {...props} {...oficial}/>}
        />
    </Switch>
)

export default Materia;