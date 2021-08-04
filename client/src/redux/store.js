import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export function configureStore(initialState){
    const store = createStore(
        reducer,
        applyMiddleware(thunk)
    );
    return store;
}