import { GET_PRODUCT } from '../consts/actionTypes.js'

const initialState = {
    
}
export default function productos(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }
}