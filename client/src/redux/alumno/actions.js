import axios from 'axios';
import {
    GET_POSTULANTES,
    ENABLE_POSTULANTE,
    REGISTER_POSTULANTE
} from '../actions';

const dockerConfig = 'cite.com';
const devConfig = 'localhost:4003'

/* REGISTER_POSTULANTE */

const registerPostulanteAsync = async (postulante) => {
    // const { cursos, postulantes, num_casco } = postulante;
    const setPostulante = await axios.post(`http://${devConfig}/api/postulantes/register`,{
        ...postulante
    }).then(res=>res.data).catch(err=>err);
    return setPostulante;
}

export const registerPostulante = (postulante) => async dispatch => {
    const data = {
        cursos: "PLEGADOR012021",
        postulantes: "8756785",
        num_casco: 12
    }
    const registrar = await registerPostulanteAsync(data)
    return dispatch({
        type: REGISTER_POSTULANTE,
        payload: ""
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