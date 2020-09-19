import { USER_LOGIN } from '../consts/actionTypes'

const initialState = {}

export default function user(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                data: action.payload
            }

        default:
            return { ...state };
    }

}