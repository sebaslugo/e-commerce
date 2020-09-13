import { GET_CART, ADD_CART, EMPTY_CART } from '../consts/actionTypes.js'

const initialState = {
    cart: {}
}
export default function shoppingCart(state = initialState, action) {
    switch (action.type) {
        case GET_CART:
            return {
                ...state,
                data: action.payload
            }
        default:
            return { ...state };
            break;
        case ADD_CART:
            return {
                ...state
            }
            break;
        case EMPTY_CART:
            return {
                ...state,
                data: { products: [] }
            }
    }



}