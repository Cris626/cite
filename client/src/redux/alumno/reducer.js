import {
    GET_POSTULANTES,
    REGISTER_POSTULANTE
} from '../actions';

const initialState = {
}

export default (state= initialState, action) => {
    switch(action.type){
        case GET_POSTULANTES:
            return { ...state, ...action.payload }
        case REGISTER_POSTULANTE:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}