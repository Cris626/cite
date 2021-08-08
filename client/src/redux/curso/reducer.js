import {
    REGISTER_COURSE,
    GET_INSTRUCTORS,
    GET_CURSOS,
    GET_CURSO_BY_AP
} from '../actions';

const initialState = {
    data: [],
    cursos: [],
    curso: []
}

export default (state= initialState, action) => {
    switch(action.type){
        case REGISTER_COURSE:
            return { ...state, ...action.payload }
        case GET_INSTRUCTORS:
            return { ...state, ...action.payload }
        case GET_CURSOS:
            return { ...state, ...action.payload }
        case GET_CURSO_BY_AP:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}