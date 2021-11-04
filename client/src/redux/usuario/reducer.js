import {
    LOGIN_USER,
    FORGOT_PASSWORD
} from '../actions';

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return { ...state, ...action.payload }
        case FORGOT_PASSWORD:
            return {...action.payload }
        default:
            return { ...state }
    }
}