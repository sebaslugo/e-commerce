import { SET_ADDRESS_FORM } from '../consts/actionTypes'

const initialState = {}

export default function userPurchaseData(state = initialState, action){
    switch (action.type) {
        case SET_ADDRESS_FORM:
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