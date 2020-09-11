import { GET_ORDEN} from '../consts/actionTypes';

/* ------------------------------------------------------------------------------- */
/* INITIAL STATE */
/* ------------------------------------------------------------------------------- */

const initialState = {};

export default function categorias(state = initialState, action) {
    switch (action.type) {
        case GET_ORDEN:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }

}