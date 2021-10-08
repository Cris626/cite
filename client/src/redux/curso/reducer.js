import {
    REGISTER_COURSE,
    GET_INSTRUCTORS,
    GET_CURSOS,
    GET_CURSO_BY_AP,
    SET_INSTRUCTOR,
    GET_CURSO_MATERIAS,
    POST_NOTES_MATERIA,
    GET_MATERIAS,
    POST_DATA_ALUMNOS,
    GET_NOTAS,
    GET_CURSO_BY_NUM,
    RESET_ACTION
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
        case POST_NOTES_MATERIA:
            return { ...state, ...action.payload }
        case GET_MATERIAS:
            return { ...state, ...action.payload }
        case POST_DATA_ALUMNOS:
            return { ...state, ...action.payload }
        case GET_NOTAS:
            return { ...state, ...action.payload }
        case GET_CURSO_BY_NUM:
            return { ...state, ...action.payload }
        case RESET_ACTION:
            return {...initialState};
        default:
            return { ...state }
    }
}