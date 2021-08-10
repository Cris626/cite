import {
    GET_POSTULANTES
} from '../actions';

const initialState = {
}

export default (state= initialState, action) => {
    switch(action.type){
        case GET_POSTULANTES:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}