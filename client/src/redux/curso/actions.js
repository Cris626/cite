import axios from 'axios';
import {
    REGISTER_COURSE
} from '../actions';

/* REGISTER_COURSE */

export const registerCourse = value => async dispatch => {
    console.log(value);
    return dispatch({
        type: REGISTER_COURSE,
        payload: value
    })
}