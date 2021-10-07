import axios from 'axios';
import {
    REGISTER_INSTRUCTOR,
    DATA_INSTRUCTOR,
    EDIT_INSTRUCTOR,
    RESET_ACTION
} from '../actions';

const dockerConfig = 'cite.com';
const devConfig = 'localhost:4002'

/* RESET_ACTION */

export const resetStore = () => async dispatch => {
    return dispatch({
        type: RESET_ACTION,
        payload: ""
    })
}

/* EDIT_INSTRUCTOR */

const editInstructorAsync = async (instructor) => {
    let resul = await axios.post(`http://${devConfig}/api/instructores/edit`, {
        instructor
    }).then(res=>res.data).catch(err=>err);
    return resul;
}

export const editInstructor = value => async dispatch => {
    const { instructor, props } = value;
    const result = await editInstructorAsync(instructor);
    if(result.status===200){
        alert('Se edito con exito');
        props.history.push('/app/instructores')
    }
    return dispatch({
        type: EDIT_INSTRUCTOR,
        payload: result
    })
}

/* DATA_INSTRUCTOR */

export const dataInstructor = dataInstructor => async dispatch => {
    return dispatch({
        type: DATA_INSTRUCTOR,
        payload: {dataInstructor}
    })
}

/* REGISTER_INSTRUCTOR */

const registerInstructorAsync = async (data) => {
    let result = await axios.post(`http://${devConfig}/api/instructores/register`,{
        apellido: data.apellido.toUpperCase(),
        certi: data.certi,
        contraseña: data.contraseña,
        correo: data.correo,
        edad: data.edad,
        genero: data.genero.toUpperCase(),
        grado: data.grado,
        nombre: data.nombre.toUpperCase(),
        servi: data.servi,
        saltos: data.saltos,
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const registerInstructor = data => async dispatch => {
    // const { value, history } = data;
    const registro = await registerInstructorAsync(data);
    const { status } = registro;
    if(status===200){
        alert("Registro exitoso");
        return dispatch({
            type: REGISTER_INSTRUCTOR,
            payload: status
        })
    }else{
        alert("Error de registro");
        return dispatch({
            type: REGISTER_INSTRUCTOR,
            payload: "error"
        })
    }
}