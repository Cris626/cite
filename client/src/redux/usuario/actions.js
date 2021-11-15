import axios from 'axios';
import {
    LOGIN_USER,
    FORGOT_PASSWORD,
    SEND_CODE,
    SEND_PASSWORD
} from '../actions';

// const dockerConfig = 'cite.com';
const devConfig = 'localhost:4000'

// const devConfig = 'cite.com'

/* SEND_PASSWORD */

const sendPasswordAsync = async data => {
    let result = await axios.post(`http://${devConfig}/api/forgotPassword/${data.match.params.code}/${data.match.params.id}`,{
        password: data.password
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const sendPassword = value => async dispatch => {
    const {history} = value;
    const result = await sendPasswordAsync(value);
    if(result.status){
        alert("SE CAMBIO LA CONTRASEÑA SATISFACTORIAMENTE");
        history.push('/');
        return dispatch({
            type: SEND_PASSWORD,
            payload: result
        })
    }else{
        alert('ERROR');
        history.push('/');
    }
}

/* SEND_CODE */ 

const sendCodeAsync = async data =>{
    let result = await axios.post(`http://${devConfig}/api/forgotPassword/${data.match.params.correo}/sendCode`,{
        code: data.code,
    }).then(res=>res.data).catch(err=>err);
    return result;
}

export const sendCode = value => async dispatch => {
    const { history } = value;
    const result = await sendCodeAsync(value);
    if(result.status){
        history.push(`/user/forgotPassword/${value.code}/${result.id}`)
        return dispatch({
            type: SEND_CODE,
            payload: result
        })
    }
    return alert("CODIGO INCORRECTO");
}

/* FORGOT_PASSWORD */

const forgotPasswordAsync = async (data) => {
    let result = await axios.post(`http://${devConfig}/api/forgotPassword/sendEmail`,{
        email: data.email,
    }).then(res=>res.data.messageId).catch(err=>err);
    return result;
}

export const forgotPasswordEmail = value => async dispatch => {
    const { history } = value;
    const result = await forgotPasswordAsync(value);
    if(result){
        history.push(`/user/forgotPassword/${value.email}/sendCode`)
        return dispatch({
            type: FORGOT_PASSWORD,
            payload: result
        })
    };
    alert("EL CORREO NO EXISTE");
    return dispatch({
        type: FORGOT_PASSWORD,
        payload: false
    })
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
