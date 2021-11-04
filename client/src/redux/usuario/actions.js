import axios from 'axios';
import {
    LOGIN_USER,
    FORGOT_PASSWORD
} from '../actions';

// const dockerConfig = 'cite.com';
// const devConfig = 'localhost:4000'

const devConfig = 'cite.com'

/* FORGOT_PASSWORD */

const forgotPasswordAsync = async (data) => {
    let result = await axios.post(`http://${devConfig}/api/forgotPassword`,{
        email: data.email,
        newPassword: data.newPassword
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const forgotPassword = value => async dispatch => {
    const { history } = value;
    const result = await forgotPasswordAsync(value);
    if(result){
        alert("CAMBIO DE CONTRASEÑA EXITOSA");
        history.push('/');
        return dispatch({
            type: FORGOT_PASSWORD,
            payload: result
        })
    };
    return alert("EL CORREO INGRESADO NO EXISTE");
}


/* LOGIN_USER */

const loginUserAsync = async (data) => {
    let result = await axios.post(`http://${devConfig}/api/autenticacion`,{
        correo: data.correo,
        contraseña: data.contraseña
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const loginUser = value => async dispatch => {
    const { data, props } = value;
    const { history } = props;
    const dataLogin = await loginUserAsync(data);
    const { status } = dataLogin;
    if(status){
        const { jwToken } = dataLogin;
        alert("DATOS CORRECTOS");
        localStorage.removeItem('Authorization');
        localStorage.setItem('Authorization', `${jwToken}`);
        history.push('/app/main');
        window.location.reload();
        return dispatch({
            type: LOGIN_USER,
            payload: dataLogin
        })
    }else{
        alert("CORREO O CONTRASEÑA INCORRECTA");
        return dispatch({
            type: LOGIN_USER,
            payload: ""
        })
    }
}
