import { combineReducers } from 'redux';
import usuario from './usuario/reducer';
import curso from './curso/reducer';

const reducer = combineReducers({
    usuario,
    curso
})

export default reducer;