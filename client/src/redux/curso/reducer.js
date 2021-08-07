import {
    REGISTER_COURSE,
    GET_INSTRUCTORS
} from '../actions';

const initialState = {
    data: []
}

export default (state= initialState, action) => {
    switch(action.type){
        case REGISTER_COURSE:
            return { ...state, ...action.payload }
        case GET_INSTRUCTORS:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}