import {
    REGISTER_INSTRUCTOR
} from '../actions';

const initialState = {}

export default (state = initialState, action) => {
    switch(action.type){
        case REGISTER_INSTRUCTOR:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}