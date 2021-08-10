import { combineReducers } from 'redux';
import usuario from './usuario/reducer';
import curso from './curso/reducer';
import instructor from './instructor/reducer';
import alumno from './alumno/reducer';

const reducer = combineReducers({
    usuario,
    curso,
    instructor,
    alumno
})

export default reducer;