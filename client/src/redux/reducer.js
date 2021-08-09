import { combineReducers } from 'redux';
import usuario from './usuario/reducer';
import curso from './curso/reducer';
import instructor from './instructor/reducer';

const reducer = combineReducers({
    usuario,
    curso,
    instructor
})

export default reducer;