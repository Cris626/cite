import {
    REGISTER_INSTRUCTOR,
    DATA_INSTRUCTOR,
    EDIT_INSTRUCTOR,
    RESET_ACTION
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
        case RESET_ACTION:
            return {...initialState};
        default:
            return { ...state }
    }
}