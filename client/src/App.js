import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './estilos/app.scss'

const jwt = require('jsonwebtoken');
let token = localStorage.getItem('Authorization');

const VistaApp = React.lazy(()=> import('./vistas/app'));

const VistaUsuario = React.lazy(()=> import('./vistas/usuario'));

function autenticacionToken(){
  let jwToken = jwt.verify(token, 'keyPassword', (err, decoded)=>{
    if(err){
      return false;
    }else{
      return true;
    }
  });
  return jwToken;
}

const App = () => {
  return (
    <div className="main">
      <React.Fragment>
        <Suspense>
          <Router history>
            <Switch>
              <Route 
                path='/app'
                render={props=> autenticacionToken()?<VistaApp {...props} />: <VistaUsuario {...props} />}
              />
              <Route
                path='/'
                render={props=> autenticacionToken()?<VistaUsuario {...props} />: <VistaUsuario {...props} />}
              />
            </Switch>
          </Router>
        </Suspense>
      </React.Fragment>
    </div>
  );
}

export default App;
