import {
    REGISTER_COURSE
} from '../actions';

const initialState = {}

export default (state= initialState, action) => {
    switch(action.type){
        case REGISTER_COURSE:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}