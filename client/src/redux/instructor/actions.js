import axios from 'axios';
import {
    REGISTER_INSTRUCTOR
} from '../actions';

const dockerConfig = 'cite.com';
const devConfig = 'localhost:4002'

/* REGISTER_INSTRUCTOR */

const registerInstructorAsync = async (data) => {
    console.log(data)
    let result = await axios.post(`http://${devConfig}/api/instructores/register`,{
        apellido: data.apellido.toUpperCase(),
        certi: data.certi,
        contraseña: data.contraseña,
        correo: data.correo,
        edad: data.edad,
        genero: data.genero.value.toUpperCase(),
        grado: data.grado.value,
        nombre: data.nombre.toUpperCase(),
        servi: data.servi
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