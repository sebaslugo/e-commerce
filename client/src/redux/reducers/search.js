import { SEARCH_PRODUCT } from '../consts/actionTypes.js';

/* ------------------------------------------------------------------------------- */
/* INITIAL STATE */
/* ------------------------------------------------------------------------------- */

const initialState = {};

export default function busqueda(state = initialState, action) {
    switch (action.type) {
        case SEARCH_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }
}