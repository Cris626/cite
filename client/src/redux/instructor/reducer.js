import {
    REGISTER_INSTRUCTOR,
    DATA_INSTRUCTOR,
    EDIT_INSTRUCTOR
} from '../actions';

const initialState = {
    dataInstructor: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case REGISTER_INSTRUCTOR:
            return { ...state, ...action.payload }
        case DATA_INSTRUCTOR:
            return { ...state, ...action.payload }
        case EDIT_INSTRUCTOR:
            return { ...state, ...action.payload }
        default:
            return { ...state }
    }
}