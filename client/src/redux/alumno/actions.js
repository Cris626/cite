import axios from 'axios';
import {
    GET_POSTULANTES,
    ENABLE_POSTULANTE,
    REGISTER_POSTULANTE
} from '../actions';

// const dockerConfig = 'cite.com';
const devConfig = 'localhost:4003'
// const devConfig = 'cite.com'


/* REGISTER_POSTULANTE */

const registerPostulanteAsync = async (postulante) => {
    const setPostulante = await axios.post(`http://${devConfig}/api/postulantes/register`,{
        ...postulante
    }).then(res=>res.data).catch(err=>err);
    return setPostulante;
}

export const registerPostulante = (postulante) => async dispatch => {
    const registrar = await registerPostulanteAsync(postulante);
    if(registrar.value===200){
        alert("Se registro con exito");
        window.location.reload();
    }else{
        alert("El casco ya fue registrado")
    }
    return dispatch({
        type: REGISTER_POSTULANTE,
        payload: registrar.value
    })
}


/* GET_POSTULANTES */

const getPostulantesASync = async () => {
    let postulantes = await axios.post(`http://${devConfig}/api/postulantes`).then(res=>res.data).catch(err=>err);
    return postulantes;
}

export const getPostulantes = () => async dispatch => {
    let postulantes = await getPostulantesASync();
    return dispatch({
        type: GET_POSTULANTES,
        payload: postulantes
    })
}

/* ENABLE_POSTULANTE */

const enablePostulanteAsync = async (ci) => {
    let result = await axios.post(`http://${devConfig}/api/postulantes/edit/${ci}`).then(res=>res.data).catch(err=>err);
    return result;
}

export const enablePostulante = (data) => async dispatch => {
    let postulante = await enablePostulanteAsync(data);
    const { status } = postulante;
    if(status===200){
        alert("Se habilito al postulante");
        window.location.reload();
        return dispatch({
            type: ENABLE_POSTULANTE,
            payload: status
        })
    }else{
        alert("Error de registro");
        return dispatch({
            type: ENABLE_POSTULANTE,
            payload: "error"
        })
    }
}