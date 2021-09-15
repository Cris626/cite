import {
    REGISTER_COURSE,
    GET_INSTRUCTORS,
    GET_CURSOS,
    GET_CURSO_BY_AP,
    SET_INSTRUCTOR,
    GET_CURSO_MATERIAS,
    // GET_MATERIA_INSTRUCTOR,
    GET_MATERIAS
} from '../actions';

const initialState = {
    data: [],
    cursos: [],
    curso: [],
    materias_instructor: []
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
        case SET_INSTRUCTOR:
            return { ...state, ...action.payload }
        case GET_CURSO_MATERIAS:
            return { ...state, ...action.payload }
        // case GET_MATERIA_INSTRUCTOR:
        //     return { ...state, ...action.payload }
        case GET_MATERIAS:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}