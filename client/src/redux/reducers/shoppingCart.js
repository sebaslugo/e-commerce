import { GET_CART,EDIT_ORDEN,GET_CARTG} from '../consts/actionTypes.js'

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
        case GET_CARTG:
            return{
                ...state,
                data:action.payload
            }
        case EDIT_ORDEN:
            return {
                ...state,
                data:{}
            }
        default:
            return { ...state };
            break;
        
        
    }



}