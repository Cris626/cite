import axios from 'axios';
import {
    GET_POSTULANTES
} from '../actions';


/* GET_POSTULANTES */

const getPostulantesASync = async () => {
    let postulantes = await axios.post('http://localhost:4003/api/postulantes').then(res=>res.data).catch(err=>err);
    return postulantes;
}

export const getPostulantes = () => async dispatch => {
    let postulantes = await getPostulantesASync();
    return dispatch({
        type: GET_POSTULANTES,
        payload: postulantes
    })
}