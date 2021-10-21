import {
    GET_POSTULANTES,
    REGISTER_POSTULANTE,
    RESET_ACTION,
    GET_ALUMNOS
} from '../actions';

const initialState = {
}

export default (state= initialState, action) => {
    switch(action.type){
        case GET_ALUMNOS:
            return { ...action.payload }
        case GET_POSTULANTES:
            return { ...state, ...action.payload }
        case REGISTER_POSTULANTE:
            return { ...state, ...action.payload }
        case RESET_ACTION:
            return {...initialState};
        default:
            return { ...state }
    }
}