import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<h1>___CARGANDO___</h1>}>
        <App />
      </Suspense>
  </Provider>,
  document.getElementById('root')
);