import {
    LOGIN_USER,
    FORGOT_PASSWORD,
    SEND_CODE,
    SEND_PASSWORD
} from '../actions';

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, ...action.payload }
        case FORGOT_PASSWORD:
            return {...state, ...action.payload }
        case SEND_CODE:
            return {...state, ...action.payload }
        case SEND_PASSWORD:
            return {...state, ...action.payload }
        default:
            return { ...state }
    }
}