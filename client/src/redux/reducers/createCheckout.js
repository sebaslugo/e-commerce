import { CREATE_CHECKOUT } from '../consts/actionTypes.js';

const initialState = {}

export default function createCheckout(state = initialState, action) {
    switch (action.type) {
        case CREATE_CHECKOUT:
            return {
                ...state,
                data: action.payload
            }

        default:
            return  state;
    }

}