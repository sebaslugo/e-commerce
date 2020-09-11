import { GET_PRODUCT, GET_CATEGORY, DELETE_PRODUCT, EDIT_PRODUCT } from '../consts/actionTypes.js';

/* ------------------------------------------------------------------------------- */
/* INITIAL STATE */
/* ------------------------------------------------------------------------------- */

const initialState = {};

export default function productList(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
            break;
        case GET_CATEGORY:
            return {
                ...state,
                data: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state };
    }

}