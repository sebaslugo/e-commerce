import { GET_USER, LOGOUT } from '../consts/actionTypes'

const initialState = {}

export default function orden(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                data: action.payload
            }
            break;
        case LOGOUT:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }

}
