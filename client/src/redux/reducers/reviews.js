import { GET_REVIEW } from '../consts/actionTypes.js'

const initialState = {
}
export default function productos(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }
}