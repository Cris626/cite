import axios from 'axios';
import {
    GET_POSTULANTES,
    ENABLE_POSTULANTE
} from '../actions';

const dockerConfig = 'cite.com';
const devConfig = 'localhost:4003'


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
    console.log(data)
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