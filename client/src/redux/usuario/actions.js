import axios from 'axios';
import {
    LOGIN_USER
} from '../actions';

/* LOGIN_USER */

export const loginUser = value => async dispatch => {
    return dispatch({
        type: LOGIN_USER,
        payload: value
    })
}
