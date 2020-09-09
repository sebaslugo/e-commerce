import { CREATE_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY, GET_CATEGORY } from '../consts/actionTypes.js';

/* ------------------------------------------------------------------------------- */
/* INITIAL STATE */
/* ------------------------------------------------------------------------------- */

const initialState = {};

export default function categorias(state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                data: action.payload
            }
            break;
        default:
            return { ...state };
    }
}