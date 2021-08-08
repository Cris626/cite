import axios from 'axios';
import {
    REGISTER_COURSE,
    GET_INSTRUCTORS,
    GET_CURSOS,
    GET_CURSO_BY_AP,
    SET_INSTRUCTOR
} from '../actions';

/* SET_INSTRUCTOR */

const setInstructorAsync = async (data) => {
    const { codigo, value } = data;
    let idDocument = await axios.post(`http://localhost:4001/api/cursos/materia/${codigo}`).then(res=>res.data).catch(err=>err);
    let updateDocument = await axios.post(`http://localhost:4001/api/cursos/update/${idDocument.idCurso}`, {
        ...value
    }).then(res=>res.data).catch(err=>err);
    return updateDocument;
}

export const setInstructor = value => async dispatch => {
    let setInstructor = await setInstructorAsync(value);
    const { status } = setInstructor;
    if(status===200){
        alert("Registro exitoso");
        return dispatch({
            type: SET_INSTRUCTOR,
            payload: status
        })
    }else{
        alert("Error de registro");
        return dispatch({
            type: SET_INSTRUCTOR,
            payload: "error"
        })
    }
}

/* GET_CURSO_BY_AP */

const getCursoByApAsync = async (app) => {
    let resul = await axios.post(`http://localhost:4001/api/cursos/${app}`).then(res=>res.data).catch(err=>err);
    return resul;
}

export const getCursoByAp = (value) => async dispatch => {
    let curso = await getCursoByApAsync(value);
    return dispatch({
        type: GET_CURSO_BY_AP,
        payload: curso
    })
}

/* GET_CURSOS */

const getCoursesAsync = async () => {
    let resul = await axios.post('http://localhost:4001/api/cursos/').then(res=>res.data).catch(err=>err);
    return resul;
}

export const getCourses = () => async dispatch => {
    let cursos = await getCoursesAsync();
    return dispatch({
        type: GET_CURSOS,
        payload: cursos
    })
}

/* REGISTER_COURSE */

const registerCourseAsync = async (data) => {
    let result = await axios.post('http://localhost:4001/api/cursos/registrar', {
        tipo: data.tipo.value,
        apertura_curso: data.apertura_curso,
        cierre_curso: data.cierre_curso,
        fecha_preinscripcion: data.fecha_preinscripcion,
        apertura_psicol: data.apertura_psicol,
        cierre_psicol: data.cierre_psicol,
        apertura_medico: data.apertura_medico,
        cierre_medico: data.cierre_medico,
        apertura_fisico: data.apertura_fisico,
        cierre_fisico: data.cierre_fisico,
        inauguracion: data.inauguracion,
        apertura_tierra: data.apertura_tierra,
        cierre_tierra: data.cierre_tierra,
        apertura_saltos: data.apertura_saltos,
        cierre_saltos: data.cierre_saltos,
        jefe_curso: data.jefe_curso.value
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const registerCourse = data => async dispatch => {
    const { value, history } = data;
    const registro = await registerCourseAsync(value);
    const { status } = registro;
    if(status===200){
        alert("Registro exitoso");
        return dispatch({
            type: REGISTER_COURSE,
            payload: status
        })
    }else{
        alert("Error de registro");
        return dispatch({
            type: REGISTER_COURSE,
            payload: "error"
        })
    }
}

/* GET_INSTRUCTORS */

const getInstructorsAsync = async () => {
    let result = await axios.post('http://localhost:4001/api/cursos/instructores').then(doc=>doc.data).catch(err=>err);
    return result;
}

export const getInstructors = () => async dispatch => {
    let instructores = await getInstructorsAsync();
    return dispatch({
        type: GET_INSTRUCTORS,
        payload: instructores
    })
}