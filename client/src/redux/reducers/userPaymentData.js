import { SET_PAYMENT_FORM } from '../consts/actionTypes'

const initialState = {}

export default function userPaymentData(state = initialState, action){
    switch (action.type) {
        case SET_PAYMENT_FORM:
            return {
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state
            };
    }
}