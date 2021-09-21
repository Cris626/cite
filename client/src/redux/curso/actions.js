import axios from 'axios';
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
    GET_NOTAS
} from '../actions';

const dockerConfig = 'cite.com';
const devConfig = 'localhost:4001';

/* GET_MATERIA_INSTRUCTOR */

// const getMateriasAsync = async (value) => {
//     const ids = value;
// }

// export const getCursoMateriasInstructor = value => async dispatch => {
//     let materias = await getMateriasAsync(value);
//     return dispatch({
//         type: GET_MATERIA_INSTRUCTOR,
//         payload: ""
//     })
// }

/* GET_NOTAS */

const getNotasAsync = async value =>{
    const notasDoc = await axios.post(`http://${devConfig}/api/cursos/notas/${value}`)
        .then(res=> res.data).catch(err=> err)
    return notasDoc;
}

export const getNotas = (value) => async dispatch => {
    const notas = await getNotasAsync(value);
    return dispatch({
        type: GET_NOTAS,
        payload: notas
    })
}

/* POST_NOTES_MATERIA */

const postDataMateriasAsync = async (dataMateria, dataCurso) => {
    const { code, curso_numero } = dataCurso;
    const postDataMateria = await axios.post(`http://${devConfig}/api/cursos/materias/calificacion/${curso_numero}/${code}`,{
        dataMateria
    }).then(res=> res.data).catch(err=>err);
    return postDataMateria;
};

export const postNotesMateria = (value, data, history) => async dispatch => {
    const materiaStatus = await postDataMateriasAsync(value, data);
    if(materiaStatus.data===200){
        alert("Se califico con éxito")
        history.push('/app/instructores/cursos')
    }else{
        alert(`Error: ${materiaStatus}`)
    }
    return dispatch({
        type: POST_NOTES_MATERIA,
        payload: materiaStatus
    })
}

/* POST_DATA_ALUMNOS */

export const postDataAlumnos = value => async dispatch => {
    return dispatch({
        type: POST_DATA_ALUMNOS,
        payload: {data_alumnos: value}
    })
}

/* GET_CURSO_MATERIAS */

const getCursoMateriasAsync = async (id) => {
    const apellido = id;
    let getDocument = await axios.post(`http://${devConfig}/api/cursos/instructores/materias/${apellido}`).then(res=>res.data).catch(err=>err);
    return getDocument;
}

export const getCursoMaterias = value => async dispatch => {
    let dataCursos = await getCursoMateriasAsync(value);
    return dispatch({
        type: GET_CURSO_MATERIAS,
        payload: dataCursos
    })
}

/* GET_MATERIAS */

const getMateriasInstructorAsync = async value => {
    const { curso_numero, materias } = value;
    materias.push('XXX-000');
    let materiaInstructor = await axios.post(`http://${devConfig}/api/cursos/materias/${curso_numero}/${materias}`).then(res=>res.data).catch(err=>err);
    return materiaInstructor;
}

export const getMateriasInstructor = (value) => async dispatch => {
    let materias_instructor = await getMateriasInstructorAsync(value);
    return dispatch({
        type: GET_MATERIAS,
        payload: materias_instructor
    })
}

/* SET_INSTRUCTOR */

const setInstructorAsync = async (data) => {
    const { codigo, value, tipo } = data;
    let idDocument = await axios.post(`http://${devConfig}/api/cursos/materia/${codigo}`).then(res=>res.data).catch(err=>err);
    let updateDocument = await axios.post(`http://${devConfig}/api/cursos/update/${idDocument.idCurso}/${tipo}`, {
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
    let resul = await axios.post(`http://${devConfig}/api/cursos/${app}`).then(res=>res.data).catch(err=>err);
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
    let resul = await axios.post(`http://${devConfig}/api/cursos/`).then(res=>res.data).catch(err=>err);
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
    let result = await axios.post(`http://${devConfig}/api/cursos/registrar`, {
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
    let result = await axios.post(`http://${devConfig}/api/cursos/instructores`).then(doc=>doc.data).catch(err=>err);
    return result;
}

export const getInstructors = () => async dispatch => {
    let instructores = await getInstructorsAsync();
    return dispatch({
        type: GET_INSTRUCTORS,
        payload: instructores
    })
}