import { GET_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCT_CATEGORY} from '../consts/actionTypes.js';

/* ------------------------------------------------------------------------------- */
/* INITIAL STATE */
/* ------------------------------------------------------------------------------- */

const initialState = {};

export default function productList(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                data: action.payload
            }
            break;
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
        case GET_PRODUCT_CATEGORY:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state };
    }

}